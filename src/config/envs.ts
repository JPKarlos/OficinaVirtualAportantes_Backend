import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_HOST_AUTH: string;
  DB_PORT_AUTH: number;
  DB_USER_AUTH: string;
  DB_PASSWORD_AUTH: string;
  DB_NAME_AUTH: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  SFTP_HOST: string;
  SFTP_PORT: number;
  SFTP_USER: string;
  SFTP_PASSWORD: string;
  FTP_HOST: string;
  FTP_PORT: number;
  FTP_USER: string;
  FTP_PASSWORD: string;
  FTP_PATH_SOLICITUDES: string;
  ROLE_APP: string;
  MAILJET_API_KEY: string;
  MAILJET_API_SECRET: string;
  MAILJET_MAIL_FROM: string;
  MAILJET_NAME_FROM: string;
  FRONTEND_URL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_HOST_AUTH: joi.string().required(),
    DB_PORT_AUTH: joi.number().required(),
    DB_USER_AUTH: joi.string().required(),
    DB_PASSWORD_AUTH: joi.string().required(),
    DB_NAME_AUTH: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),
    SFTP_HOST: joi.string().required(),
    SFTP_PORT: joi.number().required(),
    SFTP_USER: joi.string().required(),
    SFTP_PASSWORD: joi.string().required(),
    FTP_HOST: joi.string().required(),
    FTP_PORT: joi.number().required(),
    FTP_USER: joi.string().required(),
    FTP_PASSWORD: joi.string().required(),
    FTP_PATH_SOLICITUDES: joi.string().default('Solicitudes'),
    ROLE_APP: joi.string().required(),
    MAILJET_API_KEY: joi.string().required(),
    MAILJET_API_SECRET: joi.string().required(),
    MAILJET_MAIL_FROM: joi.string().required(),
    MAILJET_NAME_FROM: joi.string().required(),
    FRONTEND_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env) as {
  error: joi.ValidationError | null;
  value: EnvVars;
};

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  dbHost: envVars.DB_HOST,
  dbPort: envVars.DB_PORT,
  dbUser: envVars.DB_USER,
  dbPassword: envVars.DB_PASSWORD,
  dbName: envVars.DB_NAME,
  dbHostAuth: envVars.DB_HOST_AUTH,
  dbPortAuth: envVars.DB_PORT_AUTH,
  dbUserAuth: envVars.DB_USER_AUTH,
  dbPasswordAuth: envVars.DB_PASSWORD_AUTH,
  dbNameAuth: envVars.DB_NAME_AUTH,
  jwtSecret: envVars.JWT_SECRET,
  jwtExpiresIn: envVars.JWT_EXPIRES_IN,
  sftpHost: envVars.SFTP_HOST,
  sftpPort: envVars.SFTP_PORT,
  sftpUser: envVars.SFTP_USER,
  sftpPassword: envVars.SFTP_PASSWORD,
  ftpHost: envVars.FTP_HOST,
  ftpPort: envVars.FTP_PORT,
  ftpUser: envVars.FTP_USER,
  ftpPassword: envVars.FTP_PASSWORD,
  ftpPathSolicitudes: envVars.FTP_PATH_SOLICITUDES,
  roleApp: envVars.ROLE_APP,
  mailjetApiKey: envVars.MAILJET_API_KEY,
  mailjetApiSecret: envVars.MAILJET_API_SECRET,
  mailFrom: envVars.MAILJET_MAIL_FROM,
  nameFrom: envVars.MAILJET_NAME_FROM,
  frontendUrl: envVars.FRONTEND_URL,
};
