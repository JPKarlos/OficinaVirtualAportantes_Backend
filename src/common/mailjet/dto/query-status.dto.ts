import { IsUrl } from 'class-validator';

export class QueryStatusDto {
  @IsUrl()
  messageHref: string;
}
