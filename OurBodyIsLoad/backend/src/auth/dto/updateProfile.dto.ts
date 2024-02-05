import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsArray,
  ArrayContains,
} from 'class-validator';
import { Buffer } from 'buffer';
import Role from 'src/user/role.enum';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  newPassword?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  currentPassword?: string;

  @IsOptional()
  avatarImageName?: string;

  avatarImage?: string;

  @IsOptional()
  avatarImageFileBuffer?: Buffer;

  @IsOptional()
  @IsArray()
  @ArrayContains([...Object.values(Role)]) // Assuming 'Role' is your enum
  roles?: Role[];
}
