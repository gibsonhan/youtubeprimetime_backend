import { Response } from 'express'
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }
    @Post('/google/signin')
    googleSignIn(@Body() test: any): Promise<{ accessToken: string }> {
        return this.authService.googleSignIn(test)
    }

    @Post('/google/signup')
    googleSignUp(@Body() test: any): Promise<void> {
        return this.authService.googleSignUp(test)
    }
    @Post('/signin')
    signIn(
        @Body() authCredentialsDto: AuthCredentialsDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<{ accessToken: string }> {
        let test = this.authService.signIn(authCredentialsDto)
        response.cookie('acccesToken', test, {
            expires: new Date(new Date().getTime() + 30 * 1000),
            sameSite: 'strict',
            httpOnly: true,
        })
        return this.authService.signIn(authCredentialsDto)
    }

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto)
    }
}
