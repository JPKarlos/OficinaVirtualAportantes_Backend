import { DataSource, DataSourceOptions } from 'typeorm';
import { envs } from './envs';

export const DataSourceConfig: DataSourceOptions = {
  name: 'dbSIRIS_EPS',
  type: 'mssql',
  host: envs.dbHost,
  port: envs.dbPort,
  username: envs.dbUser,
  password: envs.dbPassword,
  database: envs.dbName,
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  synchronize: false,
  options: { encrypt: false },
  extra: {
    requestTimeout: 120_000,
  },
};

export const AppDS = new DataSource(DataSourceConfig);
