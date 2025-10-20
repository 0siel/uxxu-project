import { ArrayNotEmpty, IsArray, IsString, MaxLength } from "class-validator";

export class CreateLocationDto {
  @IsString()
  @MaxLength(60)
  locationName: string;
  @IsString()
  @MaxLength(180)
  locationAdress: string;
  @IsArray()
  @ArrayNotEmpty()
  locationLatLng: number[]
}
