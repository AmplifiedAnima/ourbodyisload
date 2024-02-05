import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { exerciseService } from './exercise.service';
import { exercise } from './Schemas/exercise.schema';
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
  ): Promise<exercise[]> {
    console.log(queryParams);

    return this.exerciseServicePrivate.findAll(queryParams);
  }

  @Get(':id')
  async getExerciseWithId(@Param('id') id: string): Promise<exercise> {
    console.log(id);
    return this.exerciseServicePrivate.getExerciseById(id);
  }

  @Post('/new-exercise')
  async createExercise(
    @Body() blogPost: createSingleExerciseDto,
  ): Promise<exercise> {
    return this.exerciseServicePrivate.createExercise(blogPost);
  }
}
