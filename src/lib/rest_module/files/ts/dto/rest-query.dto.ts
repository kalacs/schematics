import { IsNumberString, IsOptional } from 'class-validator';

export class RESTQueryDto {
  @IsNumberString()
  @IsOptional()
  readonly page: number;

  @IsNumberString()
  @IsOptional()
  readonly pageSize: number;

  @IsOptional()
  readonly sort: string;

  @IsOptional()
  readonly filters: string;
}
