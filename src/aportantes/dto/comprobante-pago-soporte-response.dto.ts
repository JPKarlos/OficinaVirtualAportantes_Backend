import { Buffer } from 'node:buffer';

export class ComprobantePagoSoporteDto {
  fileName!: string;
  buffer!: Buffer;
}