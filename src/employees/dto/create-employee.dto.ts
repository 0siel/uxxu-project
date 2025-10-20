import {
  IsEmail,
  isEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

export class CreateEmployeeDto {
  @IsUUID()
  @IsOptional()
  employeeId: string;
  @IsString()
  name: string;
  @IsString()
  lastName: string;
  @IsString()
  @MaxLength(15)
  phoneNumber: string;
  @IsEmail()
  email: string;
  @IsString()
  photoUrl: string;
}
