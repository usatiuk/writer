import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {
    BaseEntity,
    Column,
    Entity,
    Index,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { config } from "~config";

import { Document } from "./Document";

export type IUserJSON = Pick<User, "id" | "username">;

export interface IUserJWT extends IUserJSON {
    ext: number;
    iat: number;
}

export interface IUserAuthJSON extends IUserJSON {
    jwt: string;
}

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @Index({ unique: true })
    public username: string;

    @Column()
    @Index({ unique: true })
    public email: string;

    @Column()
    public passwordHash: string;

    @OneToOne(type => Document, document => document.user)
    public documents: Document[];

    constructor(username: string, email: string) {
        super();
        this.username = username;
        this.email = email;
    }

    public async verifyPassword(password: string) {
        return bcrypt.compare(password, this.passwordHash);
    }

    public async setPassword(password: string) {
        this.passwordHash = await bcrypt.hash(password, 10);
    }

    public toJSON(): IUserJSON {
        const { id, username } = this;
        return { id, username };
    }

    public toAuthJSON(): IUserAuthJSON {
        const { id, username } = this;
        return { id, username, jwt: this.toJWT() };
    }

    public toJWT() {
        return jwt.sign(this.toJSON(), config.jwtSecret, { expiresIn: "31d" });
    }
}
