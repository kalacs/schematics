import { Module } from '@nestjs/common';
import { <%= classify(pluralize(name)) %>Controller } from './<%= dasherize(pluralize(name)) %>.controller';
import { <%= classify(pluralize(name)) %>Service } from './<%= dasherize(pluralize(name)) %>.service';
import { MongooseModule } from '@nestjs/mongoose';
import { <%= classify(name) %>Schema } from './schemas/<%= dasherize(name) %>.schema';
import { AuthModule } from '../auth/auth.module';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: '<%= classify(name) %>', schema: <%= classify(name) %>Schema }]),
        AuthModule,
    ],
    controllers: [<%= classify(pluralize(name)) %>Controller],
    providers: [<%= classify(pluralize(name)) %>Service],
})
export class <%= classify(pluralize(name)) %>Module {}
