import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Users from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly user_repository: Repository<Users>,
  ) {}

  createUser = async () => {
    const user = await this.user_repository.create({
      first_name: 'amir',
      last_name: 'rahimi',
      age: 20,
      email: 'amir@example.com',
      password: 'password',
    });
    await this.user_repository.save(user);
    return user;
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
