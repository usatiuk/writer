import "reflect-metadata";

import * as Koa from "koa";
import * as logger from "koa-logger";

export const app = new Koa();

app.use(logger());
