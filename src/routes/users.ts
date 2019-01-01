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

userRouter.post("/users/login", async ctx => {
    const request = ctx.request as any;

    if (!request.body) {
        ctx.throw(400);
    }
    const { username, password } = request.body as {
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

userRouter.post("/users/signup", async ctx => {
    const request = ctx.request as any;

    if (!request.body) {
        ctx.throw(400);
    }

    const { username, password } = request.body as {
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
        // TODO: Errors
        ctx.throw(400);
    }

    ctx.body = { errors: false, data: user.toAuthJSON() };
});
