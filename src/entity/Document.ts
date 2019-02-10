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

    constructor(user: User, name: string, content: string) {
        super();
        this.createdAt = new Date();
        this.editedAt = this.createdAt;
        this.user = user;
        this.name = name;
        this.content = content;
    }

    public toJSON(user: number): IDocumentJSON {
        return {
            id: this.id,
            user: user as any,
            name: this.name,
            content: this.content,
            createdAt: this.createdAt.getTime(),
            editedAt: this.editedAt.getTime(),
        };
    }
}
