import { config } from 'dotenv';
import path from 'path';
import { getEnv } from '../utils';

export const dotenv = () => {
	const environment = getEnv('NODE_ENV', 'default');
	const file = environment === 'default' ? '.env' : `.env.${environment}`;
	config({
		path: path.resolve(process.cwd(), file),
		override: true,
	});
};
