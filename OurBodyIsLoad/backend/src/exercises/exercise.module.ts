import { Module } from '@nestjs/common';
import { exerciseController } from './exercise.controller';
import { exerciseService } from './exercise.service';
import { ExerciseSchema } from './Schemas/exercise.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ExerciseBlueprint', schema: ExerciseSchema },
    ]),
  ],
  controllers: [exerciseController],
  providers: [exerciseService],
})
export class exerciseModule {}
