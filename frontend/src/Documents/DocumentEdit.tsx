import "./Docs.scss";

import { Button, Classes, TextArea } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { IDocumentJSON } from "~../../src/entity/Document";
import { showDeletionToast } from "~AppToaster";
import { LoadingStub } from "~LoadingStub";
import {
    deleteDocCancel,
    deleteDocStart,
    fetchDocsStart,
    uploadDocStart,
} from "~redux/docs/actions";
import { IAppState } from "~redux/reducers";

export interface IDocumentEditComponentProps extends RouteComponentProps {
    allDocs: { [key: number]: IDocumentJSON };

    fetching: boolean;
    spinner: boolean;

    fetchDocs: () => void;
    deleteDoc: (id: number) => void;
    cancelDelete: () => void;
    uploadDoc: (id: number, name: string, content: string) => void;
}

export interface IDocumentEditComponentState {
    loaded: boolean;

    id: number | null;
    name: string | null;
    content: string | null;

    savedName: string | null;
    savedContent: string | null;

    dirty: boolean;
}

const defaultDocumentEditComponentState: IDocumentEditComponentState = {
    loaded: false,

    id: null,
    name: null,
    content: null,

    savedName: null,
    savedContent: null,

    dirty: false,
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
        this.remove = this.remove.bind(this);
        this.save = this.save.bind(this);
        this.onUnload = this.onUnload.bind(this);
    }

    public render() {
        if (this.state.loaded) {
            return (
                <div className="document">
                    <div className="documentHeader">
                        <input
                            className={Classes.INPUT}
                            onChange={this.handleInputChange}
                            name="name"
                            value={this.state.name}
                            onKeyPress={this.handleNameKeyPress}
                        />
                        <div className="buttons">
                            <Button
                                icon="trash"
                                minimal={true}
                                intent="danger"
                                onClick={this.remove}
                            />
                            <Button
                                icon="tick"
                                intent="success"
                                minimal={true}
                                onClick={this.save}
                            />
                        </div>
                    </div>
                    <TextArea
                        onChange={this.handleInputChange}
                        name="content"
                        value={this.state.content}
                    />
                </div>
            );
        } else {
            return this.props.spinner && <LoadingStub />;
        }
    }

    public upload() {
        this.props.uploadDoc(
            this.state.id,
            this.state.name,
            this.state.content,
        );
        this.setState({
            savedName: this.state.name,
            savedContent: this.state.content,
            dirty: false,
        } as any);
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

    public handleInputChange(
        event:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>,
    ) {
        const target = event.currentTarget;
        const value = target.value;
        const name = target.name;

        const { savedName, savedContent } = this.state;

        const updDoc: { [key: string]: string } = {
            name: this.state.name,
            content: this.state.content,
        };

        updDoc[name] = value;

        const dirty =
            savedName !== updDoc.name || savedContent !== updDoc.content;

        this.setState({
            [name]: value,
            dirty,
        } as any);
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
        if (this.state.dirty) {
            e.preventDefault();
            e.returnValue = "";
        }
    }

    private tryLoad() {
        if (!this.props.allDocs && !this.props.fetching) {
            this.props.fetchDocs();
        } else {
            const { id } = this.props.match.params as any;
            if (
                !this.state.loaded &&
                this.props.allDocs &&
                this.props.allDocs[id]
            ) {
                const doc = this.props.allDocs[id];

                this.setState({
                    ...this.state,
                    loaded: true,
                    id: doc.id,
                    name: doc.name,
                    content: doc.content,
                    savedContent: doc.content,
                    savedName: doc.name,
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
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchDocs: () => dispatch(fetchDocsStart()),
        cancelDelete: () => dispatch(deleteDocCancel()),
        deleteDoc: (id: number) => dispatch(deleteDocStart(id)),
        uploadDoc: (id: number, name: string, content: string) =>
            dispatch(uploadDocStart(id, name, content)),
    };
}

export const DocumentEdit = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(DocumentEditComponent),
);
