"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDecorator = (decotatorExpression) => `@${decotatorExpression}`;
exports.parseAttributeString = (attribuesString) => {
    return new Map(attribuesString.split(';').reduce((acc, attribues) => {
        const [attribute, type, ...decorators] = attribues.split(':');
        return [
            ...acc,
            [
                attribute,
                {
                    attribute,
                    type,
                    decorators
                }
            ]
        ];
    }, []));
};
exports.getDecoratorSet = (attributes) => {
    return [...new Set([...attributes].reduce((acc, [, { decorators }]) => {
            return [
                ...acc,
                ...decorators.map(exports.trimSignature)
            ];
        }, []))];
};
exports.trimSignature = (fuctionWithSignature) => fuctionWithSignature.substring(0, fuctionWithSignature.indexOf('('));
exports.attributesToDeclaration = (attributes, mapFunction = exports.interfaceAttributeDecorator) => [...attributes]
    .reduce((acc, [, { attribute, type, decorators }]) => [
    ...acc,
    mapFunction({
        attribute,
        type,
        decorators
    }).join("\n")
], []).join("\n\n");
const pipe = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
const pipeMap = (...fns) => x => fns.map(f => f(x));
exports.transformAttributeToDeclaration = ({ attribute, type, }) => exports.tabulate()(`readonly ${attribute}: ${type};`);
exports.transformAttributeToSchema = ({ attribute, type, }) => exports.tabulate()(`${attribute}: ${exports.capitalizeFirstLetter(type)},`);
exports.addSwaggerDecorator = data => exports.tabulate()('@ApiModelProperty()');
const createArray = (size) => new Array(size).fill(' ');
exports.tabulate = (tabSize = 2) => (value) => `${createArray(tabSize).join('')}${value}`;
exports.addClassValidatorDecorators = ({ decorators }) => decorators.map(exports.toDecorator).map(exports.tabulate()).join("\n");
exports.dtoAttributeDecorator = pipeMap(exports.addSwaggerDecorator, exports.addClassValidatorDecorators, exports.transformAttributeToDeclaration);
exports.interfaceAttributeDecorator = pipeMap(exports.transformAttributeToDeclaration);
exports.mongooseSchemaAttributeDecorator = pipeMap(exports.transformAttributeToSchema);
exports.capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
