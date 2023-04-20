import { config } from 'dotenv';
import { getEnv } from '../utils';

export const dotenv = () => {
	const environment = getEnv('NODE_ENV', 'default');
	const path = environment === 'default' ? '.env' : `.env.${environment}`;
	config({
		path,
	});
};
