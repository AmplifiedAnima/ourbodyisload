import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { FileUploadService } from 'src/S3UploadService/fileUploadService';
import {
  RecoveryToken,
  RecoveryTokenSchema,
} from './schemas/recoveryToken.schema';
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    MongooseModule.forFeature([
      { name: RecoveryToken.name, schema: RecoveryTokenSchema },
    ]),
  ],
  providers: [AuthService, JwtStrategy, FileUploadService],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
