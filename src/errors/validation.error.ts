import { HTTP_CODES } from "../constants";
import { CustomError } from "./custom.error";

export class BadRequestError extends CustomError {
	constructor(reason?: string) {
		super(HTTP_CODES.BAD_REQUEST, 'BadRequest Error: ' + reason);
	}
}
