import * as argon2 from 'argon2'
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtPayload } from './dto/jwt-payload-interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private usersRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto
        const user = await this.usersRepository.findOne({ username })
        const verifyHash = await argon2.verify(user.password, password)

        if( user && verifyHash ){
            const payload: JwtPayload = { username }
            const accessToken: string = await this.jwtService.sign(payload)
            return { accessToken }
        } else {
           throw new UnauthorizedException('Please Check your login credentials')
        }
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.usersRepository.createUser(authCredentialsDto);
    }
}
