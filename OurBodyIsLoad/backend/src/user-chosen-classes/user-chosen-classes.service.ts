import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserChosenClassDto } from './dto/create-user-chosen-class.dto';
import { userChosenClass } from './schemas/user-chosen-class.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { preExistingClass } from 'src/classes/schemas/preExistingClass.schema';
import { UserDocument } from 'src/user/schemas/user.schema';
import { UpdateUserChosenClassDto } from './dto/update-user-chosen-class.dto';

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
  async editUserChosenClass(
    id: string,
    updateUserChosenClassDto: UpdateUserChosenClassDto,
    user: UserDocument,
  ) {
    const editedClass = await this.userChosenClassModel.findOneAndUpdate(
      { _id: id, userOwnerId: user.id },
      { $set: updateUserChosenClassDto },
      { new: true },
    );

    if (!editedClass) {
      throw new NotFoundException(
        `Class with ID ${id} not found or you're not the owner.`,
      );
    }

    return editedClass;
  }

  async removeUserChosenClass(id: string, user: UserDocument): Promise<string> {
    try {
      const deleteUserChosenClass = await this.userChosenClassModel.findOne({
        _id: id,
        userOwnerId: user.id,
      });

      if (!deleteUserChosenClass) {
        return `Class with ID ${id} not found or you don't have permission to remove it.`;
      }
      await this.userChosenClassModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`error removing a class`);
    }
    return `This action removed a #${id} userChosenClass`;
  }
}
