import type { IRoute, Middleware } from './interfaces';

import express, { Application } from 'express';
import { appDataSource } from './config';
import Logger from './global/logger';


export class App {
	private app: Application;
	constructor(private port: number) {
		this.app = express();
    this.initializeDatabase();
  }

	private initializeDatabase(): void {
		appDataSource
			.initialize()
			.then(() => {
				Logger.success('Database initialized successfully');
			})
			.catch((err) => {
				Logger.error('An error occured during database initialization:', err.message);
			});
	}

	private generateGuardRouteMiddlewares(guards: Middleware[]): void {
		for (let i = 0, len = guards.length; i < len; i++) {
			this.app.use(guards[i]);
		}
	}
	private generateRoutes(routes: IRoute[]): void {
		for (let i = 0, len = routes.length; i < len; i++) {
			this.app.use(routes[i].path, routes[i].router);
		}
	}
	private generatePostRouteMiddlewares(middlewares: Middleware[]): void {
		for (let i = 0, len = middlewares.length; i < len; i++) {
			this.app.use(middlewares[i]);
		}
	}
	public listen(
		routes: IRoute[],
		guards: Middleware[] = [],
		middlewares: Middleware[] = []
  ): void {
		this.generateGuardRouteMiddlewares(guards);
		this.generateRoutes(routes);
		this.generatePostRouteMiddlewares(middlewares);
		this.app.listen(this.port, () => {
			Logger.success('App listening on port', this.port);
			Logger.info('Loaded routes', routes.map((route) => route.path).join(', '));
		});
	}
}
