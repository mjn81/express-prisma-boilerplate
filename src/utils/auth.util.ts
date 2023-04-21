import { Request } from "express";
import { UnauthorizedError } from "../errors";
import { IToken } from "../interfaces";

export const getUser = (
	request: Request
):IToken=> {
  if ('user' in request) {
    return request.user as IToken;
  }
  throw new UnauthorizedError('Unauthorized');
};
