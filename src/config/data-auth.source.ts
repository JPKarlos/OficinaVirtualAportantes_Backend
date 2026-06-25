import { DataSourceOptions } from 'typeorm';
import { envs } from './envs';

export const DataSourceAuthConfig: DataSourceOptions = {
  name: 'dbAuth',
  type: 'mssql',
  host: envs.dbHostAuth,
  port: envs.dbPortAuth,
  username: envs.dbUserAuth,
  password: envs.dbPasswordAuth,
  database: envs.dbNameAuth,
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  synchronize: false,
  options: { encrypt: false },
};
