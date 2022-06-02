import "reflect-metadata";

import * as cors from "@koa/cors";
import * as Koa from "koa";
import * as bodyParser from "koa-body";
import * as jwt from "koa-jwt";
import * as logger from "koa-logger";
import * as send from "koa-send";
import sslify, { xForwardedProtoResolver } from "koa-sslify";
import * as serve from "koa-static";

import { config, EnvType } from "~config";
import { docsRouter } from "~routes/docs";
import { userRouter } from "~routes/users";

export const app = new Koa();

app.use(cors());
app.use(logger());
app.use(bodyParser());
if (config.https) {
    app.use(sslify({ resolver: xForwardedProtoResolver }));
}
app.use(
    jwt({
        secret: config.jwtSecret,
        passthrough: true,
    }),
);

app.use(async (ctx, next) => {
    try {
        await next();
        const status = ctx.status || 404;
        if (status === 404) {
            await send(ctx, "frontend/dist/index.html");
        }
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit("error", err, ctx);
    }
});

app.use(serve("frontend/dist"));

app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(docsRouter.routes()).use(docsRouter.allowedMethods());

app.on("error", (err, ctx) => {
    if (ctx.response.status == "500") {
        console.error(err);
    }
    ctx.body = {
        error: err.message,
        data: false,
    };
});
