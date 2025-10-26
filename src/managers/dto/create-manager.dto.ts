import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  maxLength,
} from "class-validator";

export class CreateManagerDto {
  @IsString()
  @MaxLength(60)
  managerFullName: string;
  @IsNumber()
  managerSalary: number;
  @IsString()
  @IsEmail()
  managerEmail: string;
  @IsString()
  @MaxLength(16)
  managerPhoneNumber: string;
}
