import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class Create<%= classify(name) %>Dto {
  @ApiModelProperty()
  @IsString()
  readonly name: string;
}

export class Update<%= classify(name) %>Dto {
    @ApiModelProperty()
    @IsString()
    readonly name: string;
  }