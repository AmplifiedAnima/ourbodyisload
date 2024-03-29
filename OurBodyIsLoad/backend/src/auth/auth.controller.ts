import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Request,
  UsePipes,
  ValidationPipe,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/SignIn.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/user/user.interface';
import { UserDocument } from 'src/user/schemas/user.schema';
import Role from 'src/user/role.enum';
import { ExerciseBlueprint } from 'src/exercises/Schemas/exercise.schema';
import { userChosenClass } from 'src/user-chosen-classes/schemas/user-chosen-class.schema';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { FileInterceptor } from '@nestjs/platform-express';

type UserSafeData = {
  username: string;
  email?: string;
  exercises?: Array<ExerciseBlueprint>;
  userChosenClasses?: Array<userChosenClass>;
  roles?: Role[];
};

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signin')
  async signIn(
    @Body() signinDto: SignInDto,
  ): Promise<{ token: string; user: UserSafeData }> {
    const user = await this.authService.validateUser(signinDto);
    const saferData = this.authService.transformToSafeData(user);
    const dataToken = await this.authService.createToken(user);
    return { token: dataToken.accessToken, user: saferData };
  }

  @Post('signup')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async signUp(
    @Body()
    signUpDto: SignUpDto,
  ): Promise<{ token: string; user: UserSafeData }> {
    const user = await this.userService.createUser(signUpDto);
    const saferData = this.authService.transformToSafeData(user);
    const tokenData = await this.authService.createToken(user);

    return { token: tokenData.accessToken, user: saferData };
  }

  @UseGuards(AuthGuard())
  @Post('refresh-token')
  async refreshToken(@Request() req: RequestWithUser) {
    console.log(`User from request: `, req.user);

    const refreshedToken = await this.authService.refreshToken(req.user);
    console.log('Refreshed token details: ', refreshedToken);
    return refreshedToken;
  }
  @UseGuards(AuthGuard())
  @Patch('editprofile')
  async editProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @Request() request: RequestWithUser,
  ): Promise<UserDocument> {
    console.log(`dto auth`, updateProfileDto);
    const updatedUser = await this.userService.updateUserInfo(
      request.user.username,
      updateProfileDto,
    );

    return updatedUser;
  }

  @UseGuards(AuthGuard())
  @Patch('updateavatar')
  @UseInterceptors(FileInterceptor('avatarImage'))
  async updateAvatarImage(
    @Request() request: RequestWithUser,
    @UploadedFile() avatarImage: Express.Multer.File,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    console.log(avatarImage);
    const updatedUser = await this.userService.updateUserAvatarImage(
      request.user.username,
      avatarImage,
      updateProfileDto,
    );
    console.log(`auth`, updatedUser);
  }

  @Post('recover-password')
  async passwordRecovery(
    @Body('email') email: string,
  ): Promise<{ message: string }> {
    const token = await this.authService.generateRecoveryToken(email);
    console.log(`auth controller`, token, email);
    await this.authService.sendRecoveryEmail(email, token);

    return {
      message:
        'If an account with that email exists, a recovery email has been sent.',
    };
  }

  @UseGuards(AuthGuard())
  @Get('me')
  async getLoggedInUser(
    @Request() request: RequestWithUser,
  ): Promise<UserDocument> {
    console.log('me get method ', request.user);
    return request.user;
  }
}
