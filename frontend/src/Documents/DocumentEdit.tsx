import "./Docs.scss";

import { Button, H1, TextArea } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { IDocumentJSON } from "~../../src/entity/Document";
import { AppToaster } from "~App";
import { LoadingStub } from "~LoadingStub";
import {
    deleteDocCancel,
    deleteDocStart,
    fetchDocsStart,
} from "~redux/docs/actions";
import { IAppState } from "~redux/reducers";

export interface IDocumentEditComponentProps extends RouteComponentProps {
    allDocs: IDocumentJSON[];

    fetching: boolean;
    spinner: boolean;

    fetchDocs: () => void;
    deleteDoc: (id: number) => void;
    cancelDelete: () => void;
}

export class DocumentEditComponent extends React.PureComponent<
    IDocumentEditComponentProps,
    null
> {
    public render() {
        const { id } = this.props.match.params as any;
        if (this.props.allDocs && this.props.allDocs[id]) {
            const doc = this.props.allDocs[id];
            return (
                <div className="document">
                    <div className="documentHeader">
                        <H1 contentEditable={true}>{doc.name}</H1>
                        <div className="buttons">
                            <Button
                                icon="trash"
                                minimal={true}
                                onClick={() => {
                                    this.props.history.push(`/`);
                                    this.props.deleteDoc(id);
                                    AppToaster.show({
                                        message: "Document deleted!",
                                        intent: "danger",
                                        timeout: 1900,
                                        action: {
                                            text: "Undo",
                                            onClick: () =>
                                                this.props.cancelDelete(),
                                        },
                                    });
                                }}
                            />
                            <Button
                                icon="tick"
                                minimal={true}
                                onClick={() =>
                                    this.props.history.push(`/docs/${id}`)
                                }
                            />
                        </div>
                    </div>
                    <TextArea>{doc.content}</TextArea>
                </div>
            );
        } else {
            this.props.fetchDocs();
            return this.props.spinner && <LoadingStub />;
        }
    }
}

function mapStateToProps(state: IAppState) {
    return {
        allDocs: state.docs.all,
        fetching: state.docs.fetching,
        spinner: state.docs.spinner,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchDocs: () => dispatch(fetchDocsStart()),
        cancelDelete: () => dispatch(deleteDocCancel()),
        deleteDoc: (id: number) => dispatch(deleteDocStart(id)),
    };
}

export const DocumentEdit = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(DocumentEditComponent),
);
