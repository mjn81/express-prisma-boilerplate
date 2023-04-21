import { HTTP_CODES } from "../constants";
import { CustomError } from "./custom.error";

export class ServerError extends CustomError {
  constructor(reason?: string) {
    super(HTTP_CODES.INTERNAL_SERVER_ERROR, 'Server Error: ' + reason);
  }
}