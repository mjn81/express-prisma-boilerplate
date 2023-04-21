import { HTTP_CODES } from "../constants";
import { CustomError } from "./custom.error";

export class UnauthorizedError extends CustomError {
  constructor(reason?: string) {
    super(HTTP_CODES.UNAUTHORIZED, 'Unauthorized Error: ' + reason);
  }
}

export class ForbiddenError extends CustomError {
  constructor(reason?: string) {
    super(HTTP_CODES.FORBIDDEN, 'Forbidden Error: ' + reason);
  }
}
