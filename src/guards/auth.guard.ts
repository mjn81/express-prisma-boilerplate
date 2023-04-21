import { NextFunction, Request, Response } from "express";

import { ForbiddenError, UnauthorizedError } from "../errors";
import { authService } from "../services";


/** @description this function is a route guard and is meant to be on each route that needs validation */  
export const authGaurd = async (req: Request, _res: Response, next: NextFunction) => {
	const token = (req.headers['Authorization'] ??
		req.headers['authorization']) as string | undefined;
	if (!token) throw new ForbiddenError('Credentials needed');
	const content = token.split(' ')[1];
	if (!content) throw new ForbiddenError('Credentials needed');
	const decoded = await authService.verifyAndCheckToken(content);
	if (!decoded.id) throw new UnauthorizedError('Invalid Token');
	// @ts-expect-error
	req.user = decoded;
	return next();
};
