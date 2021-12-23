import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Matches(new RegExp('^(?=.*[A-Z0-9_]).{10,}$'), {
    message:
      'password should has min 10character, alpha numeric with uppercase and lowercase',
  })
  password: string;

  avatar: string;
}
