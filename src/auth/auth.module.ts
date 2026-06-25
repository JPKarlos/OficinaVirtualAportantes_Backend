import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtModuleAsyncOptions } from 'src/config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailjetModule } from 'src/common/mailjet/mailjet.module';
import { UserDataService } from './services/user-data.service';
import {
  CheckAuthStatusUseCase,
  GetJwtTokenUseCase,
  LoginUseCase,
  PasswordRestoreUseCase,
  ResetPasswordUseCase,
  ChangePasswordUseCase,
  UpdateUserAportanteIdUseCase,
} from './use-cases';
import { AportantesModule } from '../aportantes/aportantes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], 'dbAuth'),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtModuleAsyncOptions),
    MailjetModule,
    forwardRef(() => AportantesModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UserDataService,
    GetJwtTokenUseCase,
    LoginUseCase,
    CheckAuthStatusUseCase,
    ResetPasswordUseCase,
    PasswordRestoreUseCase,
    ChangePasswordUseCase,
    UpdateUserAportanteIdUseCase,
  ],
  exports: [
    TypeOrmModule,
    JwtStrategy, 
    PassportModule, 
    JwtModule,
    AuthService,
    UserDataService,
    GetJwtTokenUseCase,
    LoginUseCase,
    CheckAuthStatusUseCase,
    ResetPasswordUseCase,
    PasswordRestoreUseCase,
    ChangePasswordUseCase,
    UpdateUserAportanteIdUseCase,
  ],
})
export class AuthModule {}
