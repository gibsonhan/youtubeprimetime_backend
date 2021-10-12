import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as argon2 from 'argon2';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto?: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const hashPassword = await argon2.hash(password);
    const user = this.create({ username, password: hashPassword });

    try {
      await this.save(user);
    } catch (error) {
      console.log(error)
      if (error.code === '23505') {
        //duplicate username
        throw new ConflictException('Username already exist')
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

}