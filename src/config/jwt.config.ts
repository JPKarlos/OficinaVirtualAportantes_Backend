import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { envs } from './envs';

export const jwtModuleAsyncOptions: JwtModuleAsyncOptions = {
  useFactory: async () => ({
    secret: envs.jwtSecret,
    signOptions: { expiresIn: envs.jwtExpiresIn },
  }),
};
