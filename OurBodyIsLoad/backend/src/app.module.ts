import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { exerciseModule } from './exercises/exercise.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { preExistingClassModule } from './classes/preExistingClasses.module';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { UserChosenClassesModule } from './user-chosen-classes/user-chosen-classes.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TrainingPlansModule } from './training-plans/training-plans.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    exerciseModule,
    preExistingClassModule,
    BlogPostsModule,
    UserChosenClassesModule,
    UserModule,
    AuthModule,
    TrainingPlansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
