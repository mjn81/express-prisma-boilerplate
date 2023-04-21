import {
	PrismaClientInitializationError,
	PrismaClientKnownRequestError,
	PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { ValidationError } from 'yup';
import { HTTP_CODES } from '../constants';

import { CustomError } from '../errors';
import Logger from '../global/logger';

export const errorMiddleware = (
	error,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	Logger.error(error.message);

	if (error instanceof TokenExpiredError) {
		return res.status(HTTP_CODES.UNAUTHORIZED).json({
			message: 'Token expired',
			code: HTTP_CODES.UNAUTHORIZED,
		});
	}

	if (
		error instanceof PrismaClientKnownRequestError ||
		error instanceof PrismaClientInitializationError ||
		error instanceof PrismaClientUnknownRequestError
	) {
		return res.status(HTTP_CODES.BAD_REQUEST).json({
			message: error.message,
			code: HTTP_CODES.BAD_REQUEST,
		});
	}

	if (error instanceof CustomError) {
		return res.status(error.getCode()).json({
			message: error.getMessage(),
			code: error.getCode(),
		});
	}
	if (error instanceof ValidationError) {
		return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).json({
			message: error.message,
			code: HTTP_CODES.UNPROCESSABLE_ENTITY,
		});
	}

	return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
		message: 'oops! something went wrong!',
		code: HTTP_CODES.INTERNAL_SERVER_ERROR,
	});
};
