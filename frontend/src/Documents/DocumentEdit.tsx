import "./Docs.scss";

import {
    Button,
    Classes,
    Menu,
    MenuItem,
    Popover,
    TextArea,
} from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { IDocumentJSON } from "~../../src/entity/Document";
import { showDeletionToast, showSharedToast } from "~AppToaster";
import { LoadingStub } from "~LoadingStub";
import { NotFound } from "~NotFound";
import {
    deleteDocCancel,
    deleteDocStart,
    fetchDocsStart,
    updateDoc,
    uploadDocsStart,
} from "~redux/docs/actions";
import { IDocumentEntry } from "~redux/docs/reducer";
import { IAppState } from "~redux/reducers";

export interface IDocumentEditComponentProps extends RouteComponentProps {
    allDocs: { [key: number]: IDocumentEntry };

    fetching: boolean;
    spinner: boolean;
    username: string;

    fetchDocs: () => void;
    deleteDoc: (id: number) => void;
    cancelDelete: () => void;
    uploadDocs: () => void;
    updateDoc: (
        id: number,
        name: string,
        content: string,
        shared: boolean,
    ) => void;
}

export interface IDocumentEditComponentState {
    loaded: boolean;
    id: number | null;
}

const defaultDocumentEditComponentState: IDocumentEditComponentState = {
    loaded: false,
    id: null,
};

export class DocumentEditComponent extends React.PureComponent<
    IDocumentEditComponentProps,
    IDocumentEditComponentState
> {
    constructor(props: IDocumentEditComponentProps) {
        super(props);

        this.state = defaultDocumentEditComponentState;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNameKeyPress = this.handleNameKeyPress.bind(this);
        this.share = this.share.bind(this);
        this.remove = this.remove.bind(this);
        this.copyLink = this.copyLink.bind(this);
        this.save = this.save.bind(this);
        this.onUnload = this.onUnload.bind(this);
    }

    public render() {
        if (this.state.loaded) {
            const doc = this.props.allDocs[this.state.id];
            if (!doc) {
                return <NotFound />;
            }
            return (
                <div className="document">
                    <div className="documentHeader">
                        <input
                            className={Classes.INPUT}
                            onChange={this.handleInputChange}
                            name="name"
                            value={doc.name}
                            onKeyPress={this.handleNameKeyPress}
                        />
                        <div className="buttons">
                            <div>
                                <Popover
                                    target={
                                        <Button
                                            icon="document-share"
                                            minimal={true}
                                            intent={
                                                doc.shared ? "success" : "none"
                                            }
                                        />
                                    }
                                    content={
                                        <Menu>
                                            {doc.shared && (
                                                <MenuItem
                                                    icon="clipboard"
                                                    text={"Copy link"}
                                                    onClick={this.copyLink}
                                                />
                                            )}
                                            <MenuItem
                                                icon="globe"
                                                text={
                                                    doc.shared
                                                        ? "Remove access"
                                                        : "Make public"
                                                }
                                                onClick={this.share}
                                            />
                                        </Menu>
                                    }
                                />
                            </div>
                            <div>
                                <Button
                                    icon="trash"
                                    minimal={true}
                                    intent="danger"
                                    onClick={this.remove}
                                />
                            </div>
                            <div>
                                <Button
                                    icon="tick"
                                    intent="success"
                                    minimal={true}
                                    onClick={this.save}
                                />
                            </div>
                        </div>
                    </div>
                    <TextArea
                        onChange={this.handleInputChange}
                        name="content"
                        value={doc.content}
                    />
                </div>
            );
        } else {
            return this.props.spinner && <LoadingStub />;
        }
    }

    public upload() {
        this.props.uploadDocs();
    }

    public remove() {
        this.props.history.push(`/`);
        this.props.deleteDoc(this.state.id);
        showDeletionToast(this.props.cancelDelete);
    }

    public save() {
        this.upload();
        this.props.history.push(`/docs/${this.state.id}`);
    }

    public handleNameKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            this.save();
        }
    }

    public copyLink() {
        const doc = this.props.allDocs[this.state.id];
        navigator.clipboard.writeText(
            `http://localhost:1234/shared/${this.props.username}/${doc.id}`,
        );
        showSharedToast();
    }

    public share() {
        const doc = this.props.allDocs[this.state.id];

        const updShared = !doc.shared;

        if (updShared) {
            this.copyLink();
        }

        this.props.updateDoc(this.state.id, doc.name, doc.content, updShared);
        this.upload();
    }

    public handleInputChange(
        event:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>,
    ) {
        const target = event.currentTarget;
        const value = target.value;
        const name = target.name;

        const doc = this.props.allDocs[this.state.id];

        const updDoc: { [key: string]: string } = {
            name: doc.name,
            content: doc.content,
        };
        updDoc[name] = value;

        this.props.updateDoc(
            this.state.id,
            updDoc.name,
            updDoc.content,
            doc.shared,
        );
    }

    public componentDidUpdate() {
        this.tryLoad();
    }

    public componentDidMount() {
        this.tryLoad();
        window.addEventListener("beforeunload", this.onUnload);
    }

    public componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload);
    }

    public onUnload(e: BeforeUnloadEvent) {
        const doc = this.props.allDocs[this.state.id];

        if (doc.dirty) {
            e.preventDefault();
            e.returnValue = "";
        }
    }

    private tryLoad() {
        if (!this.props.allDocs && !this.props.fetching) {
            this.props.fetchDocs();
        } else {
            const { id } = this.props.match.params as any;
            if (!this.state.loaded && this.props.allDocs) {
                this.setState({
                    ...this.state,
                    loaded: true,
                    id,
                });
            }
        }
    }
}

function mapStateToProps(state: IAppState) {
    return {
        allDocs: state.docs.all,
        fetching: state.docs.fetching,
        spinner: state.docs.spinner,
        username: state.user.user.username,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchDocs: () => dispatch(fetchDocsStart()),
        cancelDelete: () => dispatch(deleteDocCancel()),
        deleteDoc: (id: number) => dispatch(deleteDocStart(id)),
        uploadDocs: () => dispatch(uploadDocsStart()),
        updateDoc: (
            id: number,
            name: string,
            content: string,
            shared: boolean,
        ) => dispatch(updateDoc(id, name, content, shared)),
    };
}

export const DocumentEdit = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(DocumentEditComponent),
);
