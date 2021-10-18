import { Response, Request } from 'express'
import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto, GoogleAuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }
    @Post('/google/signin')
    googleSignIn(@Body() googleAuthCredentialsDto: GoogleAuthCredentialsDto, response: Response): Promise<void> {
        return this.authService.googleSignIn(googleAuthCredentialsDto, response)
    }

    @Post('/google/signup')
    googleSignUp(@Body() googleAuthCredentialsDto: GoogleAuthCredentialsDto): Promise<void> {
        return this.authService.googleSignUp(googleAuthCredentialsDto)

    }

    @Post('/signin')
    signIn(
        @Req() request: Request,
        @Body() authCredentialsDto: AuthCredentialsDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<void> {
        return this.authService.signIn(authCredentialsDto, response)
    }

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        console.log(authCredentialsDto)
        return this.authService.signUp(authCredentialsDto)
    }
}
