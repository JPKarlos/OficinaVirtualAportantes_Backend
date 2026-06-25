import { Controller, Get, Query } from '@nestjs/common';
import { EmailLogService } from './email-log.service';
import { QueryEmailLogDto } from './dto/query-email-log.dto';
import { Auth } from 'src/auth/decorators';
import { QueryStatusDto } from './dto/query-status.dto';

@Auth()
@Controller('email-log')
export class EmailLogController {
  constructor(private readonly emailLogService: EmailLogService) {}

  @Get('get-log')
  getLog(@Query() queryEmailLogDto: QueryEmailLogDto) {
    return this.emailLogService.getEmailLog(queryEmailLogDto);
  }

  @Get('get-email-status')
  getEmailStatus(@Query() queryStatusDto: QueryStatusDto) {
    return this.emailLogService.getEmailStatus(queryStatusDto);
  }
}
