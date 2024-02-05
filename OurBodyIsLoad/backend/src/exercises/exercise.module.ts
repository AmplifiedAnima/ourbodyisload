import { Module } from '@nestjs/common';
import { exerciseController } from './exercise.controller';
import { exerciseService } from './exercise.service';
import { exerciseSchema } from './Schemas/exercise.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'exercise', schema: exerciseSchema }]),
  ],
  controllers: [exerciseController],
  providers: [exerciseService],
})
export class exerciseModule {}
