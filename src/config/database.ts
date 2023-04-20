import { DataSource } from 'typeorm';
import { envToBoolean, getEnv } from '../utils';
import { dotenv } from './dotenv';

const createDataSource = () => {
	dotenv();
  return new DataSource({
		type: getEnv('DB_TYPE', 'mysql') as any,
		host: getEnv('DB_HOST', 'localhost'),
		port: parseInt(getEnv('DB_PORT', '3306')),
		username: getEnv('DB_USERNAME'),
		password: getEnv('DB_PASSWORD'),
		database: getEnv('DB_DATABASE'),
		entities: ['src/models/*.model.ts'],
		logging: envToBoolean(getEnv('DB_LOGGING', 'false')),
		synchronize: envToBoolean(getEnv('DB_SYNCHRONIZE', 'false')),
	});
}

export const appDataSource = createDataSource();