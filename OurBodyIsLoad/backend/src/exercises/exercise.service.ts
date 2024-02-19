import { Injectable, NotFoundException } from '@nestjs/common';
import { createSingleExerciseDto } from './dto/createExerciseDto';
import { ExerciseBlueprint } from './Schemas/exercise.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { querySearchParams } from './exercise.controller';

@Injectable()
export class exerciseService {
  constructor(
    @InjectModel(ExerciseBlueprint.name)
    private exerciseModels: mongoose.Model<ExerciseBlueprint>,
  ) {}

  async findAll(
    querySearchParams: querySearchParams,
  ): Promise<ExerciseBlueprint[]> {
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

  async getExerciseById(id: string): Promise<ExerciseBlueprint> {
    const exerciseById = this.exerciseModels.findById(id);

    if (!exerciseById) {
      throw new NotFoundException('exercise not found');
    }
    return exerciseById;
  }

  async createExercise(
    createExerciseDto: createSingleExerciseDto,
  ): Promise<ExerciseBlueprint> {
    const exercise = this.exerciseModels.create(createExerciseDto);
    return exercise;
  }
}
