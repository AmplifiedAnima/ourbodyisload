import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { exerciseService } from './exercise.service';
import { ExerciseBlueprint } from './Schemas/exercise.schema';
import { createSingleExerciseDto } from './dto/createExerciseDto';

export interface querySearchParams {
  searchQuery: string;
}

@Controller('exercises')
export class exerciseController {
  constructor(private exerciseServicePrivate: exerciseService) {}

  @Get()
  async getAllExercises(
    @Query() queryParams: querySearchParams,
  ): Promise<ExerciseBlueprint[]> {
    console.log(queryParams);

    return this.exerciseServicePrivate.findAll(queryParams);
  }

  @Get(':id')
  async getExerciseWithId(@Param('id') id: string): Promise<ExerciseBlueprint> {
    console.log(id);
    return this.exerciseServicePrivate.getExerciseById(id);
  }

  @Post('/new-exercise')
  async createExercise(
    @Body() blogPost: createSingleExerciseDto,
  ): Promise<ExerciseBlueprint> {
    return this.exerciseServicePrivate.createExercise(blogPost);
  }
}
