import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';
import { IsEqualTo } from './IsEqualTo.decorator';
export class SignUpDto {
  @IsString()
  @IsNotEmpty({ message: 'Username should not be empty' })
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty({ message: 'E-mail should not be empty' })
  @IsEmail()
  email?: string;

  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Confirm Password should not be empty' })
  @IsEqualTo('password')
  confirmPassword: string;
}
