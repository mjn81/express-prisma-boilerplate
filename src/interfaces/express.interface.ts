import { NextFunction, Request, Response, Router } from 'express';

export interface IRoute {
	path: string;
	router: Router;
}

export type Middleware =
	| ((req: Request, res: Response, next: NextFunction) => void)
	| ((error, req: Request, res: Response, next: NextFunction) => void);
