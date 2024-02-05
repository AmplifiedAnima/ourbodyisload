import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Hash } from 'src/utils/hash.util';
import { SignInDto } from './dto/SignIn.dto';
import { UserDocument } from 'src/user/schemas/user.schema';
import { v4 as uuid } from 'uuid';
import {
  RecoveryToken,
  RecoveryTokenDocument,
} from './schemas/recoveryToken.schema';
import * as nodemailer from 'nodemailer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  private mailTransporter;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel(RecoveryToken.name)
    private recoveryTokenModel: Model<RecoveryTokenDocument>,
  ) {
    this.mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'czupamichal@gmail.com',
        type: 'OAuth2',
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: process.env.GOOGLE_ACCESS_TOKEN,
      },
    });
  }
  scopes = [
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.labels',
  ];
  userDataFunction = (user: UserDocument) => {
    const userData = {
      username: user.username,
      id: user._id.toString(),
      roles: user.roles,
      exercises: user.exercises,
      userChosenClasses: user.userChosenClasses,
      email: user.email,
      avatarImageUrl: user.avatarImageUrl,
    };
    return userData;
  };

  public transformToSafeData(user: UserDocument) {
    return {
      username: user.username,
      email: user.email,
      exercises: user.exercises,
      userChosenClasses: user.userChosenClasses,
      roles: user.roles,
      id: user._id.toString(),
      avatarImageUrl: user.avatarImageUrl,
    };
  }
  async createToken(user: UserDocument) {
    const userData = this.transformToSafeData(user);
    return {
      expiresIn: '3600',
      accessToken: this.jwtService.sign(userData),
      user: userData,
    };
  }

  async validateToken(accessToken: string): Promise<UserDocument> {
    try {
      const decoded = this.jwtService.verify(accessToken);
      console.log(decoded);
      const user = await this.userService.findOneByUsername(
        decoded.user.username,
      );

      console.log(user);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      console.log(`auth ${user}`);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async refreshToken(user: UserDocument) {
    const userData = this.transformToSafeData(user);
    return {
      expiresIn: '3600',
      accessToken: this.jwtService.sign(userData),
      user: userData,
    };
  }

  async generateAndSendRecoveryToken(email: string): Promise<void> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new Error('User not found.');
    }
    const recoveryToken = uuid();
    const expirationDate = new Date(new Date().getTime() + 3600000);
    await this.saveRecoveryToken(user._id, recoveryToken, expirationDate);

    await this.sendRecoveryEmail(email, recoveryToken);
  }

  async saveRecoveryToken(
    userEmail: string,
    token: string,
    expirationDate: Date,
  ): Promise<void> {
    await this.recoveryTokenModel.create({
      userEmail,
      token,
      expirationDate,
      used: false,
    });
  }

  async generateRecoveryToken(email: string): Promise<string> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const recoveryToken = uuid();
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    try {
      await this.saveRecoveryToken(user.email, recoveryToken, expiration);
      console.log(`Recovery token generated and saved for user: ${user.email}`);
    } catch (error) {
      console.error('Failed to save recovery token:', error);
      throw new Error('Failed to generate recovery token.'); // Or a more specific error handling approach
    }

    return recoveryToken;
  }

  async sendRecoveryEmail(email: string, token: string): Promise<void> {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Password Recovery',
      html: `<p>Please use the following link to reset your password:</p>
             <a href="http://yourfrontend.com/reset-password?token=${token}">Reset Password</a>
             <p>This link will expire in 1 hour.</p>`,
    };

    this.mailTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email: ', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  async validateUser(signinDto: SignInDto): Promise<UserDocument> {
    const user = await this.userService.findOneByUsername(signinDto.username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await Hash.compare(signinDto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async validatePassword(password: string, hashedPassword: string) {
    const validPassword = await Hash.compare(password, hashedPassword);
    if (!validPassword) {
      throw new UnauthorizedException('Seems like the password doesnt match');
    }
    return validPassword;
  }
}
