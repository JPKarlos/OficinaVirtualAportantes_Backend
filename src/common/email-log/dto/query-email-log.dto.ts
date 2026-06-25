import { IsNumber, IsEnum } from 'class-validator';

export enum Table {
  radicacion = 'radicacion',
}
export enum Process {
  devoluciones = 'devoluciones',
  glosas = 'glosas',
}

export class QueryEmailLogDto {
  @IsEnum(Table)
  table: Table;

  @IsNumber()
  transactionId: number;

  @IsEnum(Process)
  process: Process;
}
