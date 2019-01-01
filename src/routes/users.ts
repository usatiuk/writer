import * as Router from "koa-router";
import { IUserJWT, User } from "~entity/User";

export const userRouter = new Router();

userRouter.get("/users/user", async ctx => {
    if (!ctx.state.user) {
        ctx.throw(401);
    }

    const jwt = ctx.state.user as IUserJWT;

    const user = await User.findOne(jwt.id);

    ctx.body = { errors: false, data: user.toAuthJSON() };
});

userRouter.get("/users/login", async ctx => {
    if (!ctx.request.body) {
        ctx.throw(400);
    }
    const { username, password } = ctx.request.body as {
        username: string | null;
        password: string | null;
    };
    if (!(username && password)) {
        ctx.throw(400);
    }

    const user = await User.findOne({ username });
    if (!user || !(await user.verifyPassword(password))) {
        ctx.throw(404);
    }

    ctx.body = { errors: false, data: user.toAuthJSON() };
});

userRouter.get("/users/signup", async ctx => {
    if (!ctx.request.body) {
        ctx.throw(400);
    }

    const { username, password } = ctx.request.body as {
        username: string | null;
        password: string | null;
    };

    if (!(username && password)) {
        ctx.throw(400);
    }

    const user = new User(username);
    await user.setPassword(password);

    try {
        await user.save();
    } catch (e) {
        ctx.throw(400);
    }

    ctx.body = { errors: false, data: user.toAuthJSON() };
});
