import { Card, H4 } from "@blueprintjs/core";
import * as React from "react";
import Markdown from "react-markdown";
import { RouteComponentProps, withRouter } from "react-router";
import { IDocumentJSON } from "~../../src/entity/Document";

export interface IDocumentCardComponentProps extends RouteComponentProps {
    doc: IDocumentJSON;
}

export function DocumentCardComponent(props: IDocumentCardComponentProps) {
    const previewString = props.doc.content.substring(0, 1000);
    return (
        <Card
            className="card"
            interactive={true}
            onClick={() => props.history.push(`/docs/${props.doc.id}`)}
        >
            <H4>{props.doc.name}</H4>
            <div className="textPreview">
                <Markdown source={previewString} />
            </div>
        </Card>
    );
}

export const DocumentCard = withRouter(DocumentCardComponent);
