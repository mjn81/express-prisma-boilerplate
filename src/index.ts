import 'express-async-errors';

import { App } from './app';
import { dotenv } from './config';
import { getEnv } from './utils';
import { middlewares } from './middlewares';
import { routes } from './routes';
import { guards } from './guards';

const main = () => {
	dotenv();
	const PORT = Number(getEnv('PORT'));
	const app = new App(PORT);
	app.listen(routes, guards, middlewares);
};

main();
