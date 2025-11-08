import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  isEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";
import { User } from "src/auth/entities/user.entity";
import { Location } from "src/locations/entities/location.entity";

export class LocationEmployeeDto {
  @ApiProperty()
  locationId: number;

  @ApiPropertyOptional()
  locationName: string;

  @ApiPropertyOptional()
  locationAddress: string;

  @ApiPropertyOptional()
  locationLatLng: number[];
}

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  employeeName: string;

  @ApiProperty()
  @IsString()
  employeeLastName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(15)
  employeePhoneNumber: string;

  @ApiProperty()
  @IsEmail()
  employeeEmail: string;

  @ApiProperty()
  @IsString()
  employeePhoto: string;

  @ApiPropertyOptional()
  @IsObject()
  location: LocationEmployeeDto;
}
