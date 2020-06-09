import * as Router from "koa-router";
import { Document } from "~entity/Document";
import { User } from "~entity/User";

export const docsRouter = new Router();

docsRouter.post("/docs/new", async (ctx) => {
    if (!ctx.state.user) {
        ctx.throw(401);
    }

    const { user } = ctx.state;

    const { name, content, shared } = (ctx.request as any).body as {
        name: string | undefined;
        content: string | undefined;
        shared: boolean | undefined;
    };

    if (!name) {
        ctx.throw(400);
    }

    const document = new Document(user.id, name, content, shared);

    try {
        await document.save();
    } catch (e) {
        ctx.throw(400);
    }

    ctx.body = {
        error: false,
        data: document.toJSON(user.id),
    };
});

docsRouter.patch("/docs/byID/:id", async (ctx) => {
    if (!ctx.state.user) {
        ctx.throw(401);
    }

    const { user } = ctx.state;

    const { id } = ctx.params as {
        id: number | undefined;
    };

    if (!id) {
        ctx.throw(400);
    }

    const { name, content, shared } = (ctx.request as any).body as {
        name: string | undefined;
        content: string | undefined;
        shared: boolean | undefined;
    };

    const document = await Document.findOne({ id, user });

    if (!document) {
        ctx.throw(404);
    }

    if (name) {
        document.name = name;
    }
    if (content) {
        document.content = content;
    }
    if (shared !== undefined) {
        document.shared = shared;
    }

    try {
        document.editedAt = new Date();
        await document.save();
    } catch (e) {
        ctx.throw(400);
    }

    ctx.body = {
        error: false,
        data: document.toJSON(user.id),
    };
});

docsRouter.get("/docs/list", async (ctx) => {
    if (!ctx.state.user) {
        ctx.throw(401);
    }

    const { user } = ctx.state;

    const documents = await Document.find({ user });

    ctx.body = {
        error: false,
        data: documents.map((document) => document.toJSON(user.id)),
    };
});

docsRouter.get("/docs/byID/:id", async (ctx) => {
    if (!ctx.state.user) {
        ctx.throw(401);
    }

    const { id } = ctx.params as {
        id: number | undefined;
    };

    if (!id) {
        ctx.throw(400);
    }

    const { user } = ctx.state;

    const document = await Document.findOne({ id, user });

    if (!document) {
        ctx.throw(404);
    }

    ctx.body = {
        error: false,
        data: document.toJSON(user.id),
    };
});

docsRouter.get("/docs/shared/:username/:id", async (ctx) => {
    const { id, username } = ctx.params as {
        id: number | undefined;
        username: string | undefined;
    };

    if (!id || !username) {
        ctx.throw(400);
    }

    const user = await User.findOne({ username });

    if (!user) {
        ctx.throw(404);
    }

    const document = await Document.findOne({ id, user });

    if (!document) {
        ctx.throw(404);
    }

    if (!document.shared) {
        ctx.throw(401);
    }

    ctx.body = {
        error: false,
        data: document.toJSON(user.id),
    };
});

docsRouter.delete("/docs/byID/:id", async (ctx) => {
    if (!ctx.state.user) {
        ctx.throw(401);
    }

    const { id } = ctx.params as {
        id: number | undefined;
    };

    if (!id) {
        ctx.throw(400);
    }

    const { user } = ctx.state;

    const document = await Document.findOne({ id, user });

    if (!document) {
        ctx.throw(404);
    }

    await document.remove();

    ctx.body = {
        error: false,
        data: true,
    };
});
