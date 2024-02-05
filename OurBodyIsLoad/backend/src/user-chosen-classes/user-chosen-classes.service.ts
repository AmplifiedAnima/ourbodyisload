import { Injectable } from '@nestjs/common';
import { CreateUserChosenClassDto } from './dto/create-user-chosen-class.dto';
import { userChosenClass } from './schemas/user-chosen-class.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { preExistingClass } from 'src/classes/schemas/preExistingClass.schema';
import { UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class UserChosenClassesService {
  constructor(
    @InjectModel(userChosenClass.name)
    private userChosenClassModel: mongoose.Model<userChosenClass>,
    @InjectModel(preExistingClass.name)
    private preExistingClassModel: mongoose.Model<preExistingClass>,
  ) {}

  async create(
    createUserChosenClassDto: CreateUserChosenClassDto,
    user: UserDocument,
  ) {
    const { activityId, scheduleTime } = createUserChosenClassDto;
    const preExistingClass = await this.preExistingClassModel.findOne({
      id: activityId,
    });
    console.log('Incoming data:', createUserChosenClassDto, user);

    if (!preExistingClass) {
      throw new Error('Class not found');
    }

    const newUserChosenClass = new this.userChosenClassModel({
      preExistingClassName: preExistingClass.name,
      preExistingClassVideoUrl: preExistingClass.videoUrl,
      userOwnerId: user._id,
      scheduleTime: scheduleTime,
    });

    console.log('New userChosenClass document:', newUserChosenClass);

    try {
      const savedDocument = await newUserChosenClass.save();
      console.log('Saved document:', savedDocument);
      return savedDocument;
    } catch (error) {
      console.error('Error saving document:', error);
      // Handle the error appropriately
      throw new Error('Error saving user chosen class');
    }
  }
  async findClassesByUserId(userId: string): Promise<userChosenClass[]> {
    const classes = await this.userChosenClassModel
      .find({ userOwnerId: userId })
      .exec();
    console.log(userId);
    console.log(classes);
    return classes;
  }

  findAll() {
    return `This action returns all userChosenClasses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userChosenClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} userChosenClass`;
  }
}
