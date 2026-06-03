import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    return [];
  }
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
