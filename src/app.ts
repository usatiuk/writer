import "reflect-metadata";

import * as cors from "@koa/cors";
import * as Koa from "koa";
import * as bodyParser from "koa-body";
import * as jwt from "koa-jwt";
import * as logger from "koa-logger";
import { config } from "~config";
import { userRouter } from "~routes/users";

export const app = new Koa();

app.use(cors());
app.use(logger());
app.use(bodyParser());
app.use(
    jwt({
        secret: config.jwtSecret,
        passthrough: true,
    }),
);

app.use(userRouter.routes()).use(userRouter.allowedMethods());
