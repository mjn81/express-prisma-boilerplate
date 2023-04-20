import { ERROR_CODES } from "../constants";
import { CustomError } from "./custom.error";

export class NotFoundError extends CustomError {
  constructor(reason?: string) {
    super(ERROR_CODES.NOT_FOUND ,'Not Found: ' + reason);
  }
}