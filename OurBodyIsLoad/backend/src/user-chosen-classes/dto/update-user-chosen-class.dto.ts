import { PartialType } from '@nestjs/mapped-types';
import { CreateUserChosenClassDto } from './create-user-chosen-class.dto';

export class UpdateUserChosenClassDto extends PartialType(
  CreateUserChosenClassDto,
) {}
