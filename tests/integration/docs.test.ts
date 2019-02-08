import { expect } from "chai";
import { connect } from "config/database";
import * as request from "supertest";
import { getConnection } from "typeorm";
import { app } from "~app";
import { Document, IDocumentJSON } from "~entity/Document";

import { ISeed, seedDB } from "./util";

const callback = app.callback();

let seed: ISeed;

describe("docs", () => {
    before(async () => {
        await connect();
    });

    after(async () => {
        await getConnection().close();
    });

    beforeEach(async () => {
        seed = await seedDB();
    });

    it("should create a document", async () => {
        const response = await request(callback)
            .post("/docs/new")
            .set({
                Authorization: `Bearer ${seed.user1.toJWT()}`,
                "Content-Type": "application/json",
            })
            .send({ name: "Test1", content: "Test1" })
            .expect(200);

        expect(response.body.error).to.be.false;

        const document = response.body.data as IDocumentJSON;

        expect(document.name).to.be.equal("Test1");

        const dbDocument = await Document.findOneOrFail({
            id: document.id,
            user: seed.user1.id as any,
        });

        expect(dbDocument.name).to.be.equal("Test1");
    });

    it("should update a document", async () => {
        const response = await request(callback)
            .patch(`/docs/byID/${seed.doc1.id}`)
            .set({
                Authorization: `Bearer ${seed.user1.toJWT()}`,
                "Content-Type": "application/json",
            })
            .send({ name: "Test1", content: "Test1" })
            .expect(200);

        expect(response.body.error).to.be.false;

        const document = response.body.data as IDocumentJSON;

        expect(document.name).to.be.equal("Test1");

        const dbDocument = await Document.findOne({
            id: seed.doc1.id,
            user: seed.user1.id as any,
        });

        expect(dbDocument.name).to.be.equal("Test1");
        expect(dbDocument.editedAt.getTime()).to.be.closeTo(
            new Date().getTime(),
            1000,
        );
    });

    it("should list docs", async () => {
        const response = await request(callback)
            .get("/docs/list")
            .set({
                Authorization: `Bearer ${seed.user1.toJWT()}`,
            })
            .expect(200);

        expect(response.body.error).to.be.false;

        const documents = response.body.data as IDocumentJSON[];

        const userDocs = [seed.doc1.toJSON(seed.user1.id)];

        expect(documents).to.deep.equal(userDocs);
    });

    it("should get a document", async () => {
        const response = await request(callback)
            .get(`/docs/byID/${seed.doc1.id}`)
            .set({
                Authorization: `Bearer ${seed.user1.toJWT()}`,
            })
            .expect(200);

        expect(response.body.error).to.be.false;

        const document = response.body.data as IDocumentJSON;

        const usedDoc = seed.doc1.toJSON(seed.user1.id);

        expect(document).to.deep.equal(usedDoc);
    });

    it("should not get a document without jwt", async () => {
        const response = await request(callback)
            .get(`/docs/byID/${seed.doc1.id}`)
            .set({
                Authorization: `Bearer ${seed.user2.toJWT()}`,
            })
            .expect(404);

        expect(response.body.error).to.be.equal("Not Found");
    });

    it("should delete a document", async () => {
        const response = await request(callback)
            .delete(`/docs/byID/${seed.doc1.id}`)
            .set({
                Authorization: `Bearer ${seed.user1.toJWT()}`,
            })
            .expect(200);

        expect(response.body.error).to.be.false;

        const dbDocument = await Document.findOne(seed.doc1.id);

        expect(dbDocument).to.be.undefined;
    });
});
