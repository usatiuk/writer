import { Card, H4 } from "@blueprintjs/core";
import * as React from "react";
import { IDocumentJSON } from "~../../src/entity/Document";

export function DocumentCard({ doc }: { doc: IDocumentJSON }) {
    return (
        <Card className="card" interactive={true}>
            <H4>{doc.name}</H4>
            <div className="textPreview">{doc.content}</div>
        </Card>
    );
}
