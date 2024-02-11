import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const { activityId, scheduleTime } = createUserChosenClassDto;
      console.log(`before parsing create`, scheduleTime);
      const preExistingClass = await this.preExistingClassModel.findOne({
        id: activityId,
      });

      if (!preExistingClass) {
        throw new Error('Class not found!');
      }

      const parsedScheduleTime = new Date(scheduleTime);
      const proximityStartTime = new Date(
        parsedScheduleTime.getTime() - 30 * 60 * 1000,
      );
      const proximityEndTime = new Date(
        parsedScheduleTime.getTime() + 30 * 60 * 1000,
      );

      const existingClassesInProximity = await this.userChosenClassModel.find({
        scheduleTime: {
          $gte: proximityStartTime,
          $lte: proximityEndTime,
        },
      });

      if (existingClassesInProximity.length > 0) {
        throw new Error(
          'Class already scheduled within 30 minutes of the specified time.',
        );
      }

      const startOfDay = new Date(parsedScheduleTime);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(parsedScheduleTime);
      endOfDay.setHours(23, 59, 59, 999);
      const classesScheduledToday = await this.userChosenClassModel.find({
        scheduleTime: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

      if (classesScheduledToday.length >= 3) {
        throw new Error('Maximum number of classes for the day reached.');
      }
      const hourOfSchedule = parsedScheduleTime.getHours();

      if (hourOfSchedule >= 23 || hourOfSchedule < 4) {
        throw new Error('Scheduling between 11 PM and 4 AM is not allowed.');
      }

      console.log(`after parsing create`, parsedScheduleTime);
      const newUserChosenClass = new this.userChosenClassModel({
        preExistingClassName: preExistingClass.name,
        preExistingClassVideoUrl: preExistingClass.videoUrl,
        userOwnerId: user._id,
        scheduleTime: parsedScheduleTime,
      });

      const savedDocument = await newUserChosenClass.save();
      console.log('Saved document:', savedDocument);
      return savedDocument;
    } catch (error) {
      console.error('Error in create:', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async editUserChosenClass(
    id: string,
    updateUserChosenClassDto: UpdateUserChosenClassDto,
    user: UserDocument,
  ) {
    try {
      const { scheduleTime } = updateUserChosenClassDto;

      const parsedScheduleTime = new Date(scheduleTime);
      console.log(`edit schedule`, parsedScheduleTime);
      const updatedDto = {
        ...updateUserChosenClassDto,
        scheduleTime: parsedScheduleTime,
      };

      const proximityStartTime = new Date(
        parsedScheduleTime.getTime() - 30 * 60 * 1000,
      );
      const proximityEndTime = new Date(
        parsedScheduleTime.getTime() + 30 * 60 * 1000,
      );

      const existingClassesInProximity = await this.userChosenClassModel.find({
        _id: { $ne: id },
        scheduleTime: {
          $gte: proximityStartTime,
          $lte: proximityEndTime,
        },
      });

      const startOfDay = new Date(parsedScheduleTime);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(parsedScheduleTime);
      endOfDay.setHours(23, 59, 59, 999);
      const classesScheduledToday = await this.userChosenClassModel.find({
        scheduleTime: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

      if (classesScheduledToday.length >= 3) {
        throw new Error('Maximum number of classes for the day reached.');
      }

      if (existingClassesInProximity.length > 0) {
        throw new Error(
          'Class already scheduled within 30 minutes of the specified time.',
        );
      }
      const hourOfSchedule = parsedScheduleTime.getHours();

      if (hourOfSchedule >= 23 || hourOfSchedule < 4) {
        throw new Error('Scheduling between 11 PM and 4 AM is not allowed.');
      }
      const editedClass = await this.userChosenClassModel.findOneAndUpdate(
        { _id: id, userOwnerId: user.id },
        { $set: updatedDto },
        { new: true },
      );

      if (!editedClass) {
        throw new NotFoundException(
          `Class with ID ${id} not found or you're not the owner.`,
        );
      }
      return editedClass;
    } catch (error) {
      console.error('Error in edit:', error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
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

  async findClassesByUserId(userId: string): Promise<userChosenClass[]> {
    const classes = await this.userChosenClassModel
      .find({ userOwnerId: userId })
      .exec();
    console.log(userId);
    return classes;
  }

  findAll() {
    return `This action returns all userChosenClasses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userChosenClass`;
  }
}
