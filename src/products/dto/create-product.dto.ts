import { IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

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
    provider: string;
}
