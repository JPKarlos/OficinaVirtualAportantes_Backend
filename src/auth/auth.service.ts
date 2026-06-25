import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { ChangePasswordDto, LoginUserDto } from './dto';
import { PasswordRestoreDto } from './dto/password-restore-dto';

import { ResetPasswordDto } from './dto/reset-password-dto';
import {
  CheckAuthStatusUseCase,
  LoginUseCase,
  PasswordRestoreUseCase,
  ResetPasswordUseCase,
  ChangePasswordUseCase,
} from './use-cases';

@Injectable()
export class AuthService {

  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly checkAuthStatusUseCase: CheckAuthStatusUseCase,
    private readonly passwordRestoreUseCase: PasswordRestoreUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
  ) {}

  login(loginUserDto: LoginUserDto) {
    return this.loginUseCase.execute(loginUserDto);
  }

  checkAuthStatus(user: User) {
    return this.checkAuthStatusUseCase.execute(user);
  }

  resetPassword(resetPasswordDto: ResetPasswordDto) {
    return this.resetPasswordUseCase.execute(resetPasswordDto);
  }

  passwordRestore(passwordRestoreDto: PasswordRestoreDto) {
    return this.passwordRestoreUseCase.execute(passwordRestoreDto);
  }

  changePassword(changePasswordDto: ChangePasswordDto, user: User) {
    return this.changePasswordUseCase.execute(changePasswordDto, user.id);
  }
}
