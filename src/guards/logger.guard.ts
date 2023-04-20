import { NextFunction, Request, Response } from "express";
import Logger from "../global/logger";

/** @description logger gaurd is not an actual guard but for development and administration purpose only! */
export const loggerGuard = (req: Request, _res: Response, next: NextFunction) => {
  Logger.info(req.method, req.path, JSON.stringify(req.body) ?? null);
  next();
}