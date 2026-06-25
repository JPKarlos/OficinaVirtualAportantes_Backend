import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MailjetModule } from './common/mailjet/mailjet.module';
import { DataSourceAuthConfig } from './config/data-auth.source';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { EmailLogModule } from './common/email-log/email-log.module';
import { AportantesModule } from './aportantes/aportantes.module';
import { AccesoriaModule } from './accesoria/accesoria.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'dbSIRIS_EPS',
      useFactory: () => DataSourceConfig,
    }),
    TypeOrmModule.forRootAsync({
      name: 'dbAuth',
      useFactory: () => DataSourceAuthConfig,
    }),
    PassportModule.register({
      defaultStrategy: 'bearer',
    }),
    AuthModule,
    MailjetModule,
    EmailLogModule,
    AportantesModule,
    AccesoriaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
