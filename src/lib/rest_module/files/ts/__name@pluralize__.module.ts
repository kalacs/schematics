import { Module } from '@nestjs/common';
import { <%= classify(pluralize(name)) %>Controller } from './<%= dasherize(pluralize(name)) %>.controller';
import { <%= classify(pluralize(name)) %>Service } from './<%= dasherize(pluralize(name)) %>.service';

@Module({
    controllers: [<%= classify(pluralize(name)) %>Controller],
    providers: [<%= classify(pluralize(name)) %>Service],
})
export class <%= classify(pluralize(name)) %>Module {}