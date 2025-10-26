import { IsEmail, IsString, MinLength } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto {
  @IsString()
  @IsEmail()
  userEmail: string;
  @IsString()
  @MinLength(8)
  userPassword: string;
}
