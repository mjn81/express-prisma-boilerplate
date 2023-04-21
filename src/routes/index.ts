import { IRoute } from "../interfaces";
import { authRoute } from "./auth.route";
import { playgroundRoute } from "./playground.route";


export const routes:IRoute[] = [
  playgroundRoute,
  authRoute,
]