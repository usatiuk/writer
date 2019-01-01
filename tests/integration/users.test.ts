import { connect } from "config/database";
import { getConnection } from "typeorm";

import { ISeed, seedDB } from "./util";

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

    it("should get user", async () => {});

    it("should login user", async () => {});

    it("should not login user with wrong password", async () => {});

    it("should signup user", async () => {});

    it("should not signup user with duplicate username", async () => {});
});
