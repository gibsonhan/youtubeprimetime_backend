import * as argon2 from 'argon2'
import { randomBytes } from 'crypto'
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtPayload } from './dto/jwt-payload-interface';
import { JwtService } from '@nestjs/jwt';
import verifyGoogleToken from 'util/verifyGoogleToken';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private usersRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async googleSignUp(test: any) {
        try {
            const { email, userid } = await verifyGoogleToken(test.tokenId)
            const password: any = userid + await randomBytes(32).toString('hex')
            return this.usersRepository.createUser({ username: email, password })
        }
        catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async googleSignIn(test: any) {
        try {
            const response = await verifyGoogleToken(test.tokenId)
            const username = response.email
            const user = await this.usersRepository.findOne({ username })

            if (user) {
                const payload: JwtPayload = { username }
                const accessToken: string = await this.jwtService.sign(payload)
                return { accessToken }
            } else {
                throw new UnauthorizedException('Please Check your login credentials')
            }
        }
        catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto
        const user = await this.usersRepository.findOne({ username })
        const verifyHash = await argon2.verify(user.password, password)

        if (user && verifyHash) {
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
