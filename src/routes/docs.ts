import * as Router from "koa-router";
import { Document } from "~entity/Document";

export const docsRouter = new Router();

export type IDocumentJSON = Pick<Document, "id" | "name" | "content">;

docsRouter.post("/docs/new", async ctx => {
    if (!ctx.state.user) {
        ctx.throw(401);
    }

    const { user } = ctx.state;

    const { name, content } = (ctx.request as any).body as {
        name: string | undefined;
        content: string | undefined;
    };

    if (!(name && content)) {
        ctx.throw(400);
    }

    const document = new Document(user.id, name, content);

    try {
        await document.save();
    } catch (e) {
        ctx.throw(400);
    }

    ctx.body = {
        error: false,
        data: {
            id: document.id,
            name: document.name,
            content: document.content,
        },
    };
});

docsRouter.patch("/docs/byID/:id", async ctx => {
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

    const { name, content } = (ctx.request as any).body as {
        name: string | undefined;
        content: string | undefined;
    };

    const document = await Document.findOne({ id, user: user.id });

    if (!document) {
        ctx.throw(404);
    }

    if (name) {
        document.name = name;
    }
    if (content) {
        document.content = content;
    }

    try {
        await document.save();
    } catch (e) {
        ctx.throw(400);
    }

    ctx.body = {
        error: false,
        data: {
            id: document.id,
            name: document.name,
            content: document.content,
        },
    };
});

docsRouter.get("/docs/list", async ctx => {
    if (!ctx.state.user) {
        ctx.throw(401);
    }

    const { user } = ctx.state;

    const documents = await Document.find({ user: user.id });

    ctx.body = {
        error: false,
        data: documents.map(document => ({
            id: document.id,
            name: document.name,
            content: document.content,
        })),
    };
});

docsRouter.get("/docs/byID/:id", async ctx => {
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

    const document = await Document.findOne({ id, user: user.id });

    if (!document) {
        ctx.throw(404);
    }

    ctx.body = {
        error: false,
        data: {
            id: document.id,
            name: document.name,
            content: document.content,
        },
    };
});

docsRouter.delete("/docs/byID/:id", async ctx => {
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

    const document = await Document.findOne({ id, user: user.id });

    if (!document) {
        ctx.throw(404);
    }

    await document.remove();

    ctx.body = {
        error: false,
        data: true,
    };
});
