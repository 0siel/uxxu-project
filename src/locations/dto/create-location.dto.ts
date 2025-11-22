import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayNotEmpty,
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";

export class CreateLocationDto {
  @ApiProperty({
    default: "UxxU Juriquilla",
  })
  @IsString()
  @MaxLength(60)
  locationName: string;
  @ApiProperty({
    default: "Blvd. Universitarios 3001, Juriquilla, Querétaro, Qro., México",
  })
  @IsString()
  @MaxLength(180)
  locationAddress: string;
  @ApiProperty({
    default: [20.705780429282996, -100.44267442529818],
  })
  @IsArray()
  @ArrayNotEmpty()
  locationLatLng: number[];
  @IsObject()
  @IsOptional()
  region: Region;

  @IsUUID()
  @IsOptional()
  manager: Manager | string;
}
