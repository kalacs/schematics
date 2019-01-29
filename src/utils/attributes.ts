export const toDecorator = (decotatorExpression: string): string => `@${decotatorExpression}`;
export const parseAttributeString = (attribuesString: string): Map<string, object> => {
    return new Map(attribuesString.split(';').reduce((acc, attribues) => {
        const [ attribute, type, ...decorators ] = attribues.split(':');
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
export const getDecoratorSet = (attributes: Map<string, { attribute: string; type: string; decorators: [];}>): Array<string> | [] => {
    return [...new Set([...attributes].reduce((acc, [ , { decorators }]) => {
        return [
            ...acc,
            ...decorators.map(trimSignature)
        ];
    }, []))];
};

export const trimSignature = (fuctionWithSignature: string): string => fuctionWithSignature.substring(0, fuctionWithSignature.indexOf('('));

export const attributesToDeclaration = (
    attributes: Map<string, {
        attribute: string;
        type: string;
        decorators: [];
    }>,
    mapFunction = interfaceAttributeDecorator
): string => [...attributes]
    .reduce((acc, [, {
        attribute,
        type,
        decorators
      }]) => [
          ...acc,
          mapFunction({
            attribute,
            type,
            decorators
          }).join("\n")
        ], []).join("\n\n");

const pipe = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
const pipeMap = (...fns) => x => fns.map(f => f(x));
export const transformAttributeToDeclaration = ({
    attribute,
    type,
}) => tabulate()(`readonly ${attribute}: ${type};`);
export const transformAttributeToSchema = ({
    attribute,
    type,
}) => tabulate()(`${attribute}: ${capitalizeFirstLetter(type)},`);
export const addSwaggerDecorator = data => tabulate()('@ApiModelProperty()');
const createArray = (size: number) => new Array(size).fill(' ');
export const tabulate = (tabSize = 2) => (value: string) => `${createArray(tabSize).join('')}${value}`;
export const addClassValidatorDecorators = ({ decorators }) => decorators.map(toDecorator).map(tabulate()).join("\n");
export const dtoAttributeDecorator = pipeMap(
    addSwaggerDecorator,
    addClassValidatorDecorators,
    transformAttributeToDeclaration
);
export const interfaceAttributeDecorator = pipeMap(
    transformAttributeToDeclaration
);
export const mongooseSchemaAttributeDecorator = pipeMap(
    transformAttributeToSchema
);
export const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
