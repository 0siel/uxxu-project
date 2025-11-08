import {
  IsEmail,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  maxLength,
} from "class-validator";
import { Location } from "src/locations/entities/location.entity";

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
  @IsObject()
  location: Location;
}
