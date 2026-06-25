import { envs } from './envs';

export const SftpSourceConfig: any = {
  host: envs.sftpHost,
  port: envs.sftpPort,
  username: envs.sftpUser,
  password: envs.sftpPassword,
  // debug:console.log,
};
