import { IsNotEmpty, IsDateString, IsString } from 'class-validator';

export class CreateUserChosenClassDto {
  @IsNotEmpty()
  @IsString()
  activityId: string;

  @IsNotEmpty()
  @IsDateString()
  scheduleTime: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
