import { NextFunction, Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ValidationError } from 'yup';
import { ERROR_CODES } from '../constants';

import { CustomError } from '../errors';
import Logger from '../global/logger';

export const errorMiddleware = (
	error,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	if (error instanceof QueryFailedError) {
		Logger.error(error.message, Logger.stringError('-"query failure"-') , error.query);
		return res.status(ERROR_CODES.BAD_REQUEST).json({
			message: error.message,
			code: ERROR_CODES.BAD_REQUEST,
		});
	}

	Logger.error(error.message);
	if (error instanceof CustomError) {
		return res.status(error.getCode()).json({
			message: error.getMessage(),
			code: error.getCode(),
		});
	}
	if (error instanceof ValidationError) {
		return res.status(ERROR_CODES.UNPROCESSABLE_ENTITY).json({
			message: error.message,
			code: ERROR_CODES.UNPROCESSABLE_ENTITY,
		});
	}

	return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).json({
		message: 'oops! something went wrong!',
		code: ERROR_CODES.INTERNAL_SERVER_ERROR,
	});
};
