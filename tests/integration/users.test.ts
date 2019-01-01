import { expect } from "chai";
import { connect } from "config/database";
import * as request from "supertest";
import { getConnection } from "typeorm";
import { app } from "~app";
import { IUserAuthJSON, User } from "~entity/User";

import { ISeed, seedDB } from "./util";

const callback = app.callback();

let seed: ISeed;

describe("users", () => {
    before(async () => {
        await connect();
    });

    after(async () => {
        await getConnection().close();
    });

    beforeEach(async () => {
        seed = await seedDB();
    });

    it("should get user", async () => {
        const response = await request(callback)
            .get("/users/user")
            .set({
                Authorization: `Bearer ${seed.user1.toJWT()}`,
                "Content-Type": "application/json",
            })
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body.errors).to.be.false;

        const { jwt: _, ...user } = response.body.data as IUserAuthJSON;

        expect(user).to.deep.equal(seed.user1.toJSON());
    });

    it("should login user", async () => {
        const response = await request(callback)
            .post("/users/login")
            .set({ "Content-Type": "application/json" })
            .send({ username: "User1", password: "User1" })
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body.errors).to.be.false;

        const { jwt: _, ...user } = response.body.data as IUserAuthJSON;

        expect(user).to.deep.equal(seed.user1.toJSON());
    });

    it("should not login user with wrong password", async () => {
        const response = await request(callback)
            .post("/users/login")
            .set({ "Content-Type": "application/json" })
            .send({ username: "User1", password: "asdf" })
            .expect(404);

        expect(response.body).to.deep.equal({});
    });

    it("should signup user", async () => {
        const response = await request(callback)
            .post("/users/signup")
            .set({ "Content-Type": "application/json" })
            .send({ username: "NUser1", password: "NUser1" })
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body.errors).to.be.false;

        const { jwt: _, ...user } = response.body.data as IUserAuthJSON;

        const newUser = await User.findOneOrFail({ username: "NUser1" });

        expect(user).to.deep.equal(newUser.toJSON());
    });

    it("should not signup user with duplicate username", async () => {
        const response = await request(callback)
            .post("/users/signup")
            .set({ "Content-Type": "application/json" })
            .send({ username: "User1", password: "NUser1" })
            .expect(400);

        expect(response.body).to.deep.equal({});
    });
});
