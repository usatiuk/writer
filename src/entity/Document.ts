import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";

@Entity()
export class Document extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => User, user => user.documents)
    public user: User;

    @Column()
    public name: string;

    @Column({ type: "text" })
    public content: string;

    @Column({ type: "timestamp" })
    public createdAt: Date;

    constructor(user: User, name: string, content: string) {
        super();
        this.createdAt = new Date();
        this.user = user;
        this.name = name;
        this.content = content;
    }
}
