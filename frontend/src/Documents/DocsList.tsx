import * as React from "react";
import { IDocumentJSON } from "~../../src/entity/Document";

import { DocumentCard } from "./DocumentCard";

export function DocsList({ docs }: { docs: IDocumentJSON[] }) {
    const cards = docs.map(doc => <DocumentCard key={doc.id} doc={doc} />);
    return <div className="list">{cards}</div>;
}
