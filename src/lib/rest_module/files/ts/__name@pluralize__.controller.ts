import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiUseTags,
} from '@nestjs/swagger';
import {
    Create<%= classify(name) %>Dto,
    Update<%= classify(name) %>Dto
} from './dto/<%= dasherize(name) %>.dto';

@ApiBearerAuth()
@ApiUseTags('<%= dasherize(pluralize(name)) %>')
@Controller('<%= dasherize(pluralize(name)) %>')
export class <%= classify(pluralize(name)) %>Controller {

  @Post()
  @ApiOperation({ title: 'Create <%= dasherize(name) %>' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
	create(@Body() create<%= classify(name) %>Dto: Create<%= classify(name) %>Dto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id, @Body() update<%= classify(name) %>Dto: Update<%= classify(name) %>Dto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return `This action removes a #${id} cat`;
  }
}
