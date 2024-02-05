import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { FileUploadService } from 'src/S3UploadService/fileUploadService';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [UserService, FileUploadService],
  exports: [UserService],
})
export class UserModule {}
