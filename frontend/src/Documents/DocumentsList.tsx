import * as React from "react";
import { IDocumentJSON } from "~../../src/entity/Document";

import { DocumentCard } from "./DocumentCard";
import { NewDocumentCard } from "./NewDocumentCard";

export interface IDocumentListProps {
    docs: IDocumentJSON[];
    newDocument?: boolean;
}

export function DocumentsList(props: IDocumentListProps) {
    const cards = props.docs.map(doc => (
        <DocumentCard key={doc.id} doc={doc} />
    ));

    return (
        <div className="list">
            {props.newDocument && <NewDocumentCard />}
            {cards}
        </div>
    );
}
