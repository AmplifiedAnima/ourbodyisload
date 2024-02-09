import { Module } from '@nestjs/common';
import { TrainingPlansService } from './training-plans.service';
import { TrainingPlansController } from './training-plans.controller';
// import { UserChosenClassesService } from 'src/user-chosen-classes/user-chosen-classes.service';
// import { exerciseService } from 'src/exercises/exercise.service';

@Module({
  controllers: [TrainingPlansController],
  providers: [TrainingPlansService],
})
export class TrainingPlansModule {}
