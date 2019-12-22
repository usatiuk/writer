import * as fs from "fs";
import { ConnectionOptions } from "typeorm";

export enum EnvType {
    production, development, test
}

export interface IConfig {
    env: EnvType;
    port: number;
    jwtSecret: string;
    dbConnectionOptions: ConnectionOptions | null;
}

const production: IConfig = {
    env: EnvType.production,
    port: parseInt(process.env.PORT, 10) || 3000,
    jwtSecret: process.env.JWT_SECRET,
    dbConnectionOptions: null,
};

const development: IConfig = {
    ...production,
    env: EnvType.development,
    jwtSecret: "DEVSECRET",
};

const test: IConfig = {
    ...production,
    env: EnvType.test,
    jwtSecret: "TESTSECRET",
    dbConnectionOptions:
        process.env.NODE_ENV === "test"
            ? process.env.CI
                ? JSON.parse(fs.readFileSync("./ormconfig.ci.json").toString())
                : JSON.parse(
                      fs.readFileSync("./ormconfig.test.json").toString(),
                  )
            : null,
};

const envs: { [key: string]: IConfig } = { production, development, test };
const env = process.env.NODE_ENV || "production";
const currentConfig = envs[env];

export { currentConfig as config };
