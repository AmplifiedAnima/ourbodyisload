import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { UpdateProfileDto } from 'src/auth/dto/updateProfile.dto';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { FileUploadService } from 'src/S3UploadService/fileUploadService';

@Injectable()
export class UserService {
  private s3Client: S3Client;
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private fileUploadService: FileUploadService,
    private configService: ConfigService,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async createUser(signupDto: SignUpDto) {
    const { username, password, email } = signupDto;

    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new ConflictException(
        'user already in the database, choose different name',
      );
    }

    const existingUserByEmail = await this.userModel.findOne({ email }).exec();
    if (existingUserByEmail) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      username,
      password: hashedPassword,
      email,
    });

    return user;
  }
  async updateUserAvatarImage(
    username: string,
    avatarImage: Express.Multer.File,
    updateDto: UpdateProfileDto,
  ) {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }

    try {
      const imageUrl = await this.fileUploadService.uploadImage(
        `avatar_${user._id}.jpg`,
        avatarImage.buffer,
      );

      user.avatarImageUrl = imageUrl;

      await user.save();

      console.log('Updated user:', user);
      console.log('Avatar Image:', avatarImage);
      console.log('Update DTO:', updateDto);

      return user;
    } catch (error) {
      console.error('Error uploading image to AWS S3:', error);
      throw error;
    }
  }
  async updateUserInfo(
    username: string,
    updatedInfo: UpdateProfileDto,
  ): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updatedInfo.username && updatedInfo.username !== user.username) {
      const existingUser = await this.userModel.findOne({
        username: updatedInfo.username,
      });
      if (existingUser) {
        throw new ConflictException('Username already exists');
      }
      user.username = updatedInfo.username;
    }

    if (updatedInfo.email) {
      user.email = updatedInfo.email;
    }

    if (updatedInfo.newPassword) {
      user.password = bcrypt.hashSync(updatedInfo.newPassword, 10);
    }

    if (updatedInfo.roles) {
      user.roles = updatedInfo.roles;
    }

    await user.save();
    console.log(`dto`, updatedInfo, `user`, user);
    return user;
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOneByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).exec();
  }
  async findOneById(id: string): Promise<UserDocument> {
    console.log(id);
    return this.userModel.findOne({ id }).exec();
  }

  async findOneByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async remove(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndRemove(id).exec();
  }
}
