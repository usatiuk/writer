import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";

export interface IDocumentJSON {
    id: number;
    user: number;
    name: string;
    content: string;
    createdAt: number;
    editedAt: number;
    shared: boolean;
}

@Entity()
export class Document extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => User, user => user.documents)
    public user: User;

    @Column()
    public name: string;

    @Column({ type: "text", default: "" })
    public content: string;

    @Column({ type: "timestamp", default: null })
    public createdAt: Date;

    @Column({ type: "timestamp", default: null })
    public editedAt: Date;

    @Column({ type: "boolean", default: false })
    public shared: boolean;

    constructor(user: User, name: string, content: string, shared: boolean) {
        super();
        this.createdAt = new Date();
        this.editedAt = this.createdAt;
        this.user = user;
        this.name = name;
        this.content = content;
        this.shared = shared;
    }

    public toJSON(user: number): IDocumentJSON {
        return {
            id: this.id,
            user: user as any,
            name: this.name,
            content: this.content,
            createdAt: this.createdAt.getTime(),
            editedAt: this.editedAt.getTime(),
            shared: this.shared,
        };
    }
}
