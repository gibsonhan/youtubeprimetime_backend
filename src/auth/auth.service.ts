import * as argon2 from 'argon2'
import { randomBytes } from 'crypto'
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//dto & repository
import { AuthCredentialsDto, GoogleAuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './dto/jwt-payload-interface';
import { UserRepository } from './user.repository';
//util
import verifyGoogleToken from 'util/verifyGoogleToken';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private usersRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async googleSignUp(googleAuthCredDto: GoogleAuthCredentialsDto) {
        try {
            const { email, userid } = await verifyGoogleToken(googleAuthCredDto.idToken)
            const password: any = userid + await randomBytes(32).toString('hex')
            return this.usersRepository.createUser({ username: email, password })
        }
        catch (error) {
            console.log('what is error', error)
            throw new InternalServerErrorException('Something Went Wrong')
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

    async signIn(authCredentialsDto: AuthCredentialsDto, response: Response): Promise<void> {
        const { username, password } = authCredentialsDto
        const user = await this.usersRepository.findOne({ username })
        const verifyHash = await argon2.verify(user.password, password)
        if (user && verifyHash) {
            const payload: JwtPayload = { username }
            const token: string = await this.jwtService.sign(payload)
            response.cookie('accessToken', token, {
                //domain: 'http://localhost:3000' ,
                //path: '/signin',
                expires: new Date(new Date().getTime() + 30 * 1000),
                secure: true,
                sameSite: 'none', // Change this when in production
                httpOnly: false,
            })
        } else {
            throw new UnauthorizedException('Please Check your login credentials')
        }
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.usersRepository.createUser(authCredentialsDto);
    }
}
