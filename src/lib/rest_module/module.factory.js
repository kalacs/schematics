"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const inflection_1 = require("inflection");
const attributes_1 = require("../../utils/attributes");
const module_declarator_1 = require("../../utils/module.declarator");
const module_finder_1 = require("../../utils/module.finder");
const name_parser_1 = require("../../utils/name.parser");
const source_root_helpers_1 = require("../../utils/source-root.helpers");
function main(options) {
    options = transform(options);
    return (tree, context) => {
        return schematics_1.branchAndMerge(schematics_1.chain([
            source_root_helpers_1.mergeSourceRoot(options),
            addDeclarationToModule(options),
            schematics_1.mergeWith(generate(options)),
        ]))(tree, context);
    };
}
exports.main = main;
function transform(source) {
    const target = Object.assign({}, source);
    target.metadata = 'imports';
    target.type = 'module';
    const location = new name_parser_1.NameParser().parse(target);
    target.name = core_1.strings.dasherize(location.name);
    target.path = core_1.join(core_1.strings.dasherize(location.path), inflection_1.pluralize(target.name));
    target.language = target.language !== undefined ? target.language : 'ts';
    target.attributes = attributes_1.parseAttributeString(source.attributes);
    target.decorators = attributes_1.getDecoratorSet(target.attributes);
    return target;
}
function generate(options) {
    return (context) => schematics_1.apply(schematics_1.url(core_1.join('./files', options.language)), [
        schematics_1.template(Object.assign({}, core_1.strings, options, {
            toDecorator: attributes_1.toDecorator,
            attributesToDeclaration: attributes_1.attributesToDeclaration,
            dtoAttributeDecorator: attributes_1.dtoAttributeDecorator,
            mongooseSchemaAttributeDecorator: attributes_1.mongooseSchemaAttributeDecorator,
            pluralize: inflection_1.pluralize
        })),
        schematics_1.move(options.path),
    ])(context);
}
function addDeclarationToModule(options) {
    return (tree) => {
        if (options.skipImport !== undefined && options.skipImport) {
            return tree;
        }
        options.module = new module_finder_1.ModuleFinder(tree).find({
            name: options.name,
            path: options.path,
        });
        if (!options.module) {
            return tree;
        }
        const content = tree.read(options.module).toString();
        options.name = inflection_1.pluralize(options.name);
        const declarator = new module_declarator_1.ModuleDeclarator();
        tree.overwrite(options.module, declarator.declare(content, options));
        return tree;
    };
}
