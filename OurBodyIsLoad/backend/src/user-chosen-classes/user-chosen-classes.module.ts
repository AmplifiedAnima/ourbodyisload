import { Module } from '@nestjs/common';
import { UserChosenClassesService } from './user-chosen-classes.service';
import { UserChosenClassesController } from './user-chosen-classes.controller';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
// import { preExistingClassesService } from 'src/classes/preExistingClasses.service';
import { preExistingClassModule } from 'src/classes/preExistingClasses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { userChosenClassSchema } from './schemas/user-chosen-class.schema';
import { preExistingClassSchema } from 'src/classes/schemas/preExistingClass.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'userChosenClass', schema: userChosenClassSchema },
      { name: 'preExistingClass', schema: preExistingClassSchema },
    ]),
    UserModule,
    AuthModule,
    preExistingClassModule,
  ],
  controllers: [UserChosenClassesController],
  providers: [UserChosenClassesService],
})
export class UserChosenClassesModule {}
