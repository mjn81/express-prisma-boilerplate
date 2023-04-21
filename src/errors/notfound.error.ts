import { HTTP_CODES } from "../constants";
import { CustomError } from "./custom.error";

export class NotFoundError extends CustomError {
  constructor(reason?: string) {
    super(HTTP_CODES.NOT_FOUND ,'Not Found: ' + reason);
  }
}