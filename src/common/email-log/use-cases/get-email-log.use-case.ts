import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EmailLog } from '../entities/email-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryEmailLogDto } from '../dto/query-email-log.dto';

@Injectable()
export class GetEmailLogUseCase {
  private readonly logger = new Logger('RegisterEmailLogUseCase');

  constructor(
    @InjectRepository(EmailLog, 'dbSIRIS_EPS')
    private readonly emailLogRepository: Repository<EmailLog>,
  ) {}

  async execute(queryEmailLogDto: QueryEmailLogDto) {
    try {
      const { table, transactionId, process } = queryEmailLogDto;

      const queryBuilder =
        this.emailLogRepository.createQueryBuilder('emailLog');

      queryBuilder
        .where(
          'emailLog.table = :table AND emailLog.transactionId = :transactionId AND process = :process',
          { table, transactionId, process },
        )
        .orderBy('emailLog.dateSend', 'DESC');

      const emailLog = await queryBuilder.getMany();
      return emailLog;
    } catch (error) {
      this.logger.error(`Error al consultar log: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }
}
