import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EmailLog } from '../entities/email-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmailLogDto } from '../dto/create-email-log.dto';

@Injectable()
export class RegisterEmailLogUseCase {
  private readonly logger = new Logger('RegisterEmailLogUseCase');

  constructor(
    @InjectRepository(EmailLog, 'dbSIRIS_EPS')
    private readonly emailLogRepository: Repository<EmailLog>,
  ) {}

  async execute(createEmailLogDto: CreateEmailLogDto) {
    try {
      const newEmailLog = this.emailLogRepository.create(createEmailLogDto);
      const emailLog = await this.emailLogRepository.save(newEmailLog);
      return emailLog;
    } catch (error) {
      this.logger.error(`Error en registro de log: ${error.message}`);
      error.message = `BAD_REQUEST :: ${error.message}`;
      // throw ErrorManager.createSignatureError(error.message);
    }
  }
}
