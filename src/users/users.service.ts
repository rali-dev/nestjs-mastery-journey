import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Users from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly user_repository: Repository<Users>,
  ) {}

  createUser = async (data: CreateUserDto) => {
    const user = await this.user_repository.create(data);
    await this.user_repository.save(user);
    return user;
  };

  findUserByEmail = async (email: string, includePassword = false) => {
    const query = this.user_repository
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    if (includePassword) {
      query.addSelect('user.password');
    }

    return await query.getOne();
  };

  findAll = async () => {
    return await this.user_repository.find();
  };

  findUserById(id: number) {
    return {
      id,
      name: 'amir',
      username: 'amirhossein',
    };
  }
  findUserByUsername(username: string) {
    return {
      id: 1,
      name: 'amir',
      username,
    };
  }
}
