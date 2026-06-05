import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import UserGuard from 'src/users/dto/userGuards';
import { I18n, I18nContext } from 'nestjs-i18n';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProductDto: CreateProductDto, @Request() request) {
    const user: UserGuard = request.user;
    createProductDto.user = { id: user.id } as UserGuard;
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@I18n() i18n: I18nContext) {
    throw new HttpException({ message: i18n.t('tr.item_not_found', { args: {item: 'Product' } }) }, HttpStatus.NOT_FOUND);
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Request() request,
  ) {
    updateProductDto.user = request.user;
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number, @Request() request) {
    return this.productsService.remove(id, request.user);
  }
}
