import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import Products from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import UserGuard from 'src/users/dto/userGuards';

@Injectable()
export class ProductsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Products)
    private readonly product_repository: Repository<Products>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const new_product = await this.product_repository.save(createProductDto);
    if (!new_product) {
      throw new HttpException('Failed to create product!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { message: 'Product successfully created', product: new_product };
  }

  async findAll() {
     const products = await this.product_repository.find({
      relations: {
        user: true,
      },
    });
    return { message: 'Products successfully retrieved', products: products };
  }

  async findOne(id: number) {
    const product = await this.product_repository.findOne({
      relations: {
        user: true,
      },
      where: {
        id,
      },
    });
    if (!product) {
      throw new HttpException('Product not found!', HttpStatus.NOT_FOUND);
    }
    return { message: 'Product successfully retrieved', product: product };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const check = await this.product_repository.update({ id, user: updateProductDto.user }, { ...updateProductDto });
    if(check.affected === 0) {
      throw new HttpException('Product not found or you are not the owner!', HttpStatus.NOT_FOUND);
    } 
    return { message: 'Product successfully updated', updatedProduct: { id, ...updateProductDto } };
  }

  async remove(id: number, user: UserGuard) {
    const check = await this.product_repository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.user', 'user')
      .where('products.id = :id', { id })
      .andWhere('products.user = :user', { user: user.id })
      .getOne();

    if (!check) {
      throw new HttpException('Product not found or you are not the owner!', HttpStatus.NOT_FOUND);
    }
    await this.product_repository.remove(check);
    return { message: 'Product successfully deleted', deletedProduct: check };
  }
}
