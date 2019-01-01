import "reflect-metadata";

import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as jwt from "koa-jwt";
import * as logger from "koa-logger";
import { config } from "~config";
import { userRouter } from "~routes/users";

export const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(
    jwt({
        secret: config.jwtSecret,
        passthrough: true,
    }),
);

app.use(userRouter.routes()).use(userRouter.allowedMethods());
