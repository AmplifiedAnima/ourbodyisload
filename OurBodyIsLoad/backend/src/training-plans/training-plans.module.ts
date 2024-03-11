import { Module } from '@nestjs/common';
import { TrainingPlansService } from './training-plans.service';
import { TrainingPlansController } from './training-plans.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseBlueprintSchema } from 'src/exercises/Schemas/exercise.schema';

import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

import { TrainingPlanBlueprintSchema } from './schemas/training-plans.schema';
import { CycleOfTrainingPlansSchema } from './schemas/cycle-of-training-plans.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TrainingPlanBlueprint', schema: TrainingPlanBlueprintSchema },
      { name: 'ExerciseBlueprint', schema: ExerciseBlueprintSchema },
      {
        name: 'CycleOfTrainingPlans',
        schema: CycleOfTrainingPlansSchema,
      },
    ]),
    UserModule,
    AuthModule,
  ],
  controllers: [TrainingPlansController],
  providers: [TrainingPlansService],
})
export class TrainingPlansModule {}
