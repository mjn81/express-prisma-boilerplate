import { Request, Response, Router } from 'express';

import { ServerError } from '../errors';
import { validatorGuard } from '../guards';
import { playgroundValidator } from '../validators';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
	res.json({
		message: 'hello world!',
	});
});

router.get('/error', (_req: Request, _res: Response) => {
	throw new ServerError('Testing errors!!');
});

router.get(
	'/validator',
	validatorGuard(playgroundValidator),
	(_req: Request, res: Response) => {
		res.json({
			message: 'passed!!',
		});
	}
);

export const playgroundRoute = {
	path: '/playground',
	router,
};
