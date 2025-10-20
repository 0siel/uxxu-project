import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateProviderDto{
  @IsString()
  @MaxLength(100)
  providerName: string;
  @IsString()
  @IsEmail()
  providerEmail: string;
  @IsString()
  @MaxLength(15)
  providerPhoneNumber: string;

 }
