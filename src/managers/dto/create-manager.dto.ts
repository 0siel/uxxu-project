import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty({
    default: "Osiel Hernandez",
  })
  @IsString()
  @MaxLength(60)
  managerFullName: string;
  @ApiProperty({
    default: 15000,
  })
  @IsNumber()
  managerSalary: number;
  @ApiProperty({
    default: "osiel.hernandez@uxxu.com",
  })
  @IsString()
  @IsEmail()
  managerEmail: string;
  @ApiProperty({
    default: "5512345678",
  })
  @IsString()
  @MaxLength(16)
  managerPhoneNumber: string;
  @IsObject()
  location: Location;
}
