import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateEmailLogDto {
  @IsString()
  table: string;

  @IsNumber()
  transactionId: number;

  @IsString()
  process: string;

  @IsString()
  email: string;

  @IsString()
  messageUUID: string;

  @IsString()
  subject: string;

  @IsString()
  status: string;

  @IsString()
  messageID: string;

  @IsString()
  messageHref: string;

  @IsDate()
  dateSend: Date;
}
