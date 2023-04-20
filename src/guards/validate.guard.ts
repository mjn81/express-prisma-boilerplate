import { NextFunction, Request, Response } from 'express';
import { Schema } from 'yup';

/** @description this function is a route guard and is meant to be on each route that needs validation */  
export const validatorGuard =
	(schema: Schema) => async (req: Request, _res: Response, next: NextFunction) => {
		try {
			await schema.validate({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			return next();
		} catch (err) {
			throw err;
		}
	};
