import { Module } from '@nestjs/common';
import { exerciseController } from './exercise.controller';
import { exerciseService } from './exercise.service';
import { ExerciseBlueprintSchema } from './Schemas/exercise.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ExerciseBlueprint', schema: ExerciseBlueprintSchema },
    ]),
  ],
  controllers: [exerciseController],
  providers: [exerciseService],
})
export class exerciseModule {}
