import { Injectable, NotFoundException } from '@nestjs/common';
import { createSingleExerciseDto } from './dto/createExerciseDto';
import { exercise } from './Schemas/exercise.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { querySearchParams } from './exercise.controller';

@Injectable()
export class exerciseService {
  constructor(
    @InjectModel(exercise.name)
    private exerciseModels: mongoose.Model<exercise>,
  ) {}

  async findAll(querySearchParams: querySearchParams): Promise<exercise[]> {
    if (querySearchParams.searchQuery !== '') {
      const trimmedQuery = querySearchParams.searchQuery.trim();
      const exercisesSearched = await this.exerciseModels
        .find({
          $or: [
            {
              intensity: { $regex: trimmedQuery, $options: 'i' },
            },
            {
              reps: { $regex: trimmedQuery, $options: 'i' },
            },
            {
              sets: { $regex: trimmedQuery, $options: 'i' },
            },
            {
              name: { $regex: trimmedQuery, $options: 'i' },
            },
          ],
        })
        .exec();

      return exercisesSearched;
    } else {
      return this.exerciseModels.find({});
    }
  }

  async getExerciseById(id: string): Promise<exercise> {
    const exerciseById = this.exerciseModels.findById(id);

    if (!exerciseById) {
      throw new NotFoundException('exercise not found');
    }
    return exerciseById;
  }

  async createExercise(
    createExerciseDto: createSingleExerciseDto,
  ): Promise<exercise> {
    const exercise = this.exerciseModels.create(createExerciseDto);
    return exercise;
  }
}
