import { Module } from '@nestjs/common';
import { preExistingClassesService } from './preExistingClasses.service';
import { preExistingClassesController } from './preExistingClasses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { preExistingClassSchema } from './schemas/preExistingClass.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'preExistingClass', schema: preExistingClassSchema },
    ]),
  ],
  controllers: [preExistingClassesController],
  providers: [preExistingClassesService],
})
export class preExistingClassModule {}
