import { IsInt, Min, Max, IsUUID } from 'class-validator';

export class CreateRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsUUID()
  storeId: string;
}

export class UpdateRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
