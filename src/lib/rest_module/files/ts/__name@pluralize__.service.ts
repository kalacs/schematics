import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Create<%= classify(name) %>Dto } from './dto/create-<%=dasherize(name)%>.dto';
import { Update<%= classify(name) %>Dto } from './dto/update-<%=dasherize(name)%>.dto';
import { <%= classify(name) %> } from './interfaces/<%=dasherize(name)%>.interface';
import { RESTQueryDto } from './dto/rest-query.dto';

@Injectable()
export class <%= classify(pluralize(name)) %>Service {
  constructor(@InjectModel('<%= classify(name) %>') private readonly model: Model<<%= classify(name) %>>) {}

  create = async (entity: Create<%= classify(name) %>Dto): Promise<<%= classify(name) %>> => await this.model.create(entity);

  findOne = async (id: string): Promise<<%= classify(name) %>> => await this.model.findOne({_id: id});

  async findAll(query: RESTQueryDto): Promise<<%= classify(name) %>[]> {
    const DEFAULT_PAGE_SIZE = 100;
    const DEFAULT_PAGE = 1;
    const DEFAULT_SORT = '';
    const page = query.page || DEFAULT_PAGE;
    const pageSize = query.pageSize || DEFAULT_PAGE_SIZE;
    const sort = query.sort || DEFAULT_SORT;
    const filters = query.filters ? JSON.parse(query.filters) : {};
    const options = {
      skip: (page - 1) * pageSize,
      limit: 1 * pageSize,
      sort,
    };
    return await this.model.find(filters, null, options).exec();
  }

  async countAll(query?: RESTQueryDto): Promise<number> {
    const filters = query.filters ? JSON.parse(query.filters) : {};
    return await this.model.find(filters).countDocuments();
  }

  async findAndCountAll(query: RESTQueryDto): Promise<{ data: <%= classify(name) %>[], count: number}> {
    return await Promise.all([
      this.findAll(query),
      this.countAll(query),
    ])
      .then(([ data, count]) => ({ data, count}));
  }

  updateById = async (id: string, entity: Update<%= classify(name) %>Dto) => await this.model.findByIdAndUpdate(id, entity, { new: true });

  removeById = async (id: string) => await this.model.findByIdAndRemove(id);
}
