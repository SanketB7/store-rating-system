import { IsString, MinLength, MaxLength, IsUUID, IsOptional } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @MinLength(20)
  @MaxLength(60)
  name: string;

  @IsString()
  email: string;

  @IsString()
  @MaxLength(400)
  address: string;
}

export class UpdateStoreDto {
  @IsOptional()
  @IsString()
  @MinLength(20)
  @MaxLength(60)
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(400)
  address?: string;
}
