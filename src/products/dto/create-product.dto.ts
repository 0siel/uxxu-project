import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";
import { Product } from "../entities/product.entity";
import { Provider } from "src/providers/entities/provider.entity";

export class CreateProductDto {
  @IsUUID()
  @IsOptional()
  productId: string;

  @IsString()
  @MaxLength(50)
  productName: string;
  @IsNumber()
  price: number;
  @IsNumber()
  countSeal: number;

  @IsString()
  @IsUUID()
  @IsOptional()
  provider: Provider;
}
