import { Create<%= classify(name) %>Dto } from './create-<%= dasherize(name) %>.dto';

export class Update<%= classify(name) %>Dto extends Create<%= classify(name) %>Dto {}
