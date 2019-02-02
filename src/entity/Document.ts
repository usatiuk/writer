import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";

export type IDocumentJSON = Pick<
    Document,
    "id" | "user" | "name" | "content" | "createdAt"
>;

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

    @Column({ type: "timestamp", default: null })
    public createdAt: Date;

    @Column({ type: "timestamp", default: null })
    public editedAt: Date;

    constructor(user: User, name: string, content: string) {
        super();
        this.createdAt = new Date();
        this.editedAt = this.createdAt;
        this.user = user;
        this.name = name;
        this.content = content;
    }
}
