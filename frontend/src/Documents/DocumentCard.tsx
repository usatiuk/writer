import { Card, H4 } from "@blueprintjs/core";
import * as React from "react";
import { RouteChildrenProps, withRouter } from "react-router";
import { IDocumentJSON } from "~../../src/entity/Document";

export interface IDocumentCardComponentProps extends RouteChildrenProps {
    doc: IDocumentJSON;
}

export function DocumentCardComponent(props: IDocumentCardComponentProps) {
    return (
        <Card
            className="card"
            interactive={true}
            onClick={() => props.history.push(`/docs/${props.doc.id}`)}
        >
            <H4>{props.doc.name}</H4>
            <div className="textPreview">{props.doc.content}</div>
        </Card>
    );
}

export const DocumentCard = withRouter(DocumentCardComponent);
