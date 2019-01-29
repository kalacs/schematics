export declare const toDecorator: (decotatorExpression: string) => string;
export declare const parseAttributeString: (attribuesString: string) => Map<string, object>;
export declare const getDecoratorSet: (attributes: Map<string, {
    attribute: string;
    type: string;
    decorators: [];
}>) => string[] | [];
export declare const trimSignature: (fuctionWithSignature: string) => string;
export declare const attributesToDeclaration: (attributes: Map<string, {
    attribute: string;
    type: string;
    decorators: [];
}>, mapFunction?: (x: any) => any[]) => string;
export declare const transformAttributeToDeclaration: ({ attribute, type, }: {
    attribute: any;
    type: any;
}) => string;
export declare const transformAttributeToSchema: ({ attribute, type, }: {
    attribute: any;
    type: any;
}) => string;
export declare const addSwaggerDecorator: (data: any) => string;
export declare const tabulate: (tabSize?: number) => (value: string) => string;
export declare const addClassValidatorDecorators: ({ decorators }: {
    decorators: any;
}) => any;
export declare const dtoAttributeDecorator: (x: any) => any[];
export declare const interfaceAttributeDecorator: (x: any) => any[];
export declare const mongooseSchemaAttributeDecorator: (x: any) => any[];
export declare const capitalizeFirstLetter: (string: any) => any;
