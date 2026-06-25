import { IsString } from 'class-validator';

export class PasswordRestoreDto {
  @IsString()
  username: string;

  @IsString()
  email: string;
}
