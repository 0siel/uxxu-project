import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";
import { Product } from "../entities/product.entity";
import { Provider } from "src/providers/entities/provider.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({
    default: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
    required: false,
  })
  @IsUUID()
  @IsOptional()
  productId: string;

  @ApiProperty({
    default: "Coca cola 250ml",
  })
  @IsString()
  @MaxLength(50)
  productName: string;

  @ApiProperty({
    default: 12.5,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    default: 3,
  })
  @IsNumber()
  countSeal: number;

  @ApiProperty()
  @IsUUID()
  @IsObject()
  provider: Provider;
}
