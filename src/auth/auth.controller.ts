import { Response, Request } from 'express'
import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
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
        @Req() request: Request,
        @Body() authCredentialsDto: AuthCredentialsDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<void> {
        console.log('what is request', request.cookies)
        return this.authService.signIn(authCredentialsDto, response)
    }

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto)
    }
}
