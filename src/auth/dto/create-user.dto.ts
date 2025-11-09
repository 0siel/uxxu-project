import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { User } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    default: "user@email.com",
  })
  @IsString()
  @IsEmail()
  userEmail: string;
  @ApiProperty({
    default: "userp4ssword",
  })
  @IsString()
  @MinLength(8)
  userPassword: string;
  @ApiProperty({
    default: ["Employee"],
    enum: ["Employee", "Manager", "Admin"],
    required: false,
  })
  @IsOptional()
  @IsIn(["Employee", "Manager", "Admin"])
  userRoles: string[];
}
