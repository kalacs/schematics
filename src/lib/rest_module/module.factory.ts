import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
  branchAndMerge,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { pluralize } from 'inflection';
import {
  attributesToDeclaration,
  dtoAttributeDecorator,
  getDecoratorSet,
  mongooseSchemaAttributeDecorator,
  parseAttributeString,
  toDecorator,
} from '../../utils/attributes';
import {
  DeclarationOptions,
  ModuleDeclarator,
} from '../../utils/module.declarator';
import { ModuleFinder } from '../../utils/module.finder';
import { Location, NameParser } from '../../utils/name.parser';
import { mergeSourceRoot } from '../../utils/source-root.helpers';
import { ModuleOptions } from './module.schema';

export function main(options: ModuleOptions): Rule {
  options = transform(options);
  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        mergeSourceRoot(options),
        addDeclarationToModule(options),
        mergeWith(generate(options)),
      ]),
    )(tree, context);
  };
}

function transform(source: ModuleOptions): ModuleOptions {
  const target: any = Object.assign({}, source);
  target.metadata = 'imports';
  target.type = 'module';

  const location: Location = new NameParser().parse(target);
  target.name = strings.dasherize(location.name);
  target.path = join(strings.dasherize(location.path) as Path, pluralize(target.name));
  target.language = target.language !== undefined ? target.language : 'ts';
  target.attributes = parseAttributeString(source.attributes);
  target.decorators = getDecoratorSet(target.attributes);
  return target;
}

function generate(options: ModuleOptions) {
  return (context: SchematicContext) =>
    apply(url(join('./files' as Path, options.language)), [
      template({
        ...strings,
        ...options,
        ...{
          toDecorator,
          attributesToDeclaration,
          dtoAttributeDecorator,
          mongooseSchemaAttributeDecorator,
          pluralize
        }
      }),
      move(options.path),
    ])(context);
}

function addDeclarationToModule(options: ModuleOptions): Rule {
  return (tree: Tree) => {

    if (options.skipImport !== undefined && options.skipImport) {
      return tree;
    }

    options.module = new ModuleFinder(tree).find({
      name: options.name,
      path: options.path as Path,
    });

    if (!options.module) {
      return tree;
    }
    const content = tree.read(options.module).toString();
    options.name = pluralize(options.name);

    const declarator: ModuleDeclarator = new ModuleDeclarator();
    tree.overwrite(
      options.module,
      declarator.declare(content, options as DeclarationOptions),
    );
    return tree;
  };
}
