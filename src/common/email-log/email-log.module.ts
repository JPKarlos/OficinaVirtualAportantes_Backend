import { Module } from '@nestjs/common';
import { EmailLog } from './entities/email-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailLogController } from './email-log.controller';
import { EmailLogService } from './email-log.service';
import { GetEmailLogUseCase, RegisterEmailLogUseCase } from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([EmailLog], 'dbSIRIS_EPS')],
  controllers: [EmailLogController],
  providers: [EmailLogService, RegisterEmailLogUseCase, GetEmailLogUseCase],
  exports: [RegisterEmailLogUseCase],
})
export class EmailLogModule {}
