import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiUseTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { <%= classify(pluralize(name)) %>Service } from './<%=pluralize(name)%>.service';
import { Create<%= classify(name) %>Dto } from './dto/create-<%=dasherize(name)%>.dto';
import { Update<%= classify(name) %>Dto } from './dto/update-<%=dasherize(name)%>.dto';
import { <%= classify(name) %> } from './interfaces/<%=dasherize(name)%>.interface';
import { RESTQueryDto } from './dto/rest-query.dto';
import { PaginationInterceptor } from '../common/interceptors/pagination.interceptor';
import { TransformMongoData } from '../common/interceptors/transform-mongo.interceptor';
import { <%= classify(name) %>MongoDto } from './dto/<%=dasherize(name)%>.mongo.dto';

@ApiBearerAuth()
@ApiUseTags('<%= dasherize(pluralize(name)) %>')
@Controller('<%= dasherize(pluralize(name)) %>')
@UseInterceptors(new TransformMongoData(<%= classify(name) %>MongoDto))
@UseGuards(AuthGuard())
export class <%= classify(pluralize(name)) %>Controller {
  constructor(private readonly <%= camelize(pluralize(name)) %>Service: <%= classify(pluralize(name)) %>Service) {}

  @Post()
  @ApiOperation({ title: 'Create <%= dasherize(name) %>' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createDto: Create<%= classify(name) %>Dto): Promise<<%= classify(name) %>> {
    return await this.<%= camelize(pluralize(name)) %>Service.create(createDto);
  }

  @Get()
  @ApiOperation({ title: 'List <%= dasherize(name) %> objects' })
  @UseInterceptors(PaginationInterceptor)
  async findAll(@Query() query: RESTQueryDto): Promise<any> {
    return await this.<%= camelize(pluralize(name)) %>Service.findAndCountAll(query);
  }

  @Get(':id')
  @ApiOperation({ title: 'Get one <%= dasherize(name) %>' })
  async findOne(@Param('id') id: string): Promise<<%= classify(name) %>> {
    return await this.<%= camelize(pluralize(name)) %>Service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update <%= dasherize(name) %>' })
  async update(@Param('id') id: string, @Body() updateDto: Update<%= classify(name) %>Dto): Promise<<%= classify(name) %>> {
    return await this.<%= camelize(pluralize(name)) %>Service.updateById(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete <%= dasherize(name) %>' })
  async remove(@Param('id') id: string): Promise<<%= classify(name) %>> {
    return await this.<%= camelize(pluralize(name)) %>Service.removeById(id);
  }
}
