import { Injectable } from '@nestjs/common';
import { GetEmailLogUseCase } from './use-cases';
import { QueryEmailLogDto } from './dto/query-email-log.dto';
import { QueryStatusDto } from './dto/query-status.dto';
import { getEmailStatusUseCase } from '../mailjet/use-cases';


@Injectable()
export class EmailLogService {
  constructor(
    private getEmailLogUseCase: GetEmailLogUseCase
  ) {}

  async getEmailLog(queryEmailLogDto: QueryEmailLogDto): Promise<any> {
    return await this.getEmailLogUseCase.execute(queryEmailLogDto);
  }

  async getEmailStatus(queryStatusDto: QueryStatusDto): Promise<any> {
    return await getEmailStatusUseCase(queryStatusDto);
  }
}
