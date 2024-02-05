import { PartialType } from '@nestjs/mapped-types';
import { CreatePreExistingClassDto } from './create-pre-existing-class.dto';

export class UpdateClassDto extends PartialType(CreatePreExistingClassDto) {}
