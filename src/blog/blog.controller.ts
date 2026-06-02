import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BlogDto } from './dtos/blog.dto';

@Controller('blog')
export class BlogController {
  @Get()
  findAll(@Query() queryParams) {
    console.log(queryParams);
    return 'find all';
  }

  @Post()
  create(@Body() body: BlogDto) {
    console.log(body);
    return 'create';
  }

  @Get('category')
  findAllCategories() {
    return 'find all categories';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return `find one with id ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: BlogDto) {
    console.log(id, body);
    return `update with id ${id}`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    console.log(id);
    return `delete with id ${id}`;
  }
}
