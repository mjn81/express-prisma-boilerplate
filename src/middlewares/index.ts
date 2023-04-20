import cors from 'cors';
import { errorMiddleware } from './error.middleware';

export const middlewares = [
	cors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
  errorMiddleware,
];
