import { Card, ContextMenuTarget, H4, Menu, MenuItem } from "@blueprintjs/core";
import * as React from "react";
import Markdown from "react-markdown";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { IDocumentJSON } from "~../../src/entity/Document";
import { showDeletionToast } from "~AppToaster";
import { deleteDocCancel, deleteDocStart } from "~redux/docs/actions";

export interface IDocumentCardComponentProps extends RouteComponentProps {
    doc: IDocumentJSON;

    deleteDoc: (id: number) => void;
    cancelDelete: () => void;
}

@ContextMenuTarget
export class DocumentCardComponent extends React.PureComponent<
    IDocumentCardComponentProps,
    null
> {
    constructor(props: IDocumentCardComponentProps) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    public handleDelete() {
        showDeletionToast(this.props.cancelDelete);
        this.props.deleteDoc(this.props.doc.id);
    }

    public handleEdit() {
        this.props.history.push(`/docs/${this.props.doc.id}/edit`);
    }

    public render() {
        const previewString = this.props.doc.content.substring(0, 1000);
        return (
            <Card
                className="card"
                interactive={true}
                onClick={() =>
                    this.props.history.push(`/docs/${this.props.doc.id}`)
                }
            >
                <H4>{this.props.doc.name}</H4>
                <div className="textPreview">
                    <Markdown source={previewString} />
                </div>
            </Card>
        );
    }

    public renderContextMenu() {
        return (
            <Menu>
                <MenuItem onClick={this.handleEdit} icon="edit" text="Edit" />
                <MenuItem
                    onClick={this.handleDelete}
                    intent="danger"
                    icon="trash"
                    text="Delete"
                />
            </Menu>
        );
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        deleteDoc: (id: number) => dispatch(deleteDocStart(id)),
        cancelDelete: () => dispatch(deleteDocCancel()),
    };
}

export const DocumentCard = withRouter(
    connect(
        null,
        mapDispatchToProps,
    )(DocumentCardComponent),
);
