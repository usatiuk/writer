import "./Docs.scss";

import { Button, H1 } from "@blueprintjs/core";
import * as React from "react";
import Markdown from "react-markdown";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { IDocumentJSON } from "~../../src/entity/Document";
import { LoadingStub } from "~LoadingStub";
import { NotFound } from "~NotFound";
import { fetchSharedDoc } from "~redux/api/docs";
import { fetchDocsStart } from "~redux/docs/actions";
import { IAppState } from "~redux/reducers";
import { CodeBlock } from "./CodeBlock";

export interface ISharedViewComponentProps extends RouteComponentProps {
    loggedIn: boolean;
    username: string | undefined;
}

export interface ISharedViewComponentState {
    loaded: boolean;
    doc: IDocumentJSON | null;
    error: string | null;
}

const defaultState: ISharedViewComponentState = {
    loaded: false,
    doc: null,
    error: null,
};

export class SharedViewComponent extends React.PureComponent<
    ISharedViewComponentProps,
    ISharedViewComponentState
> {
    constructor(props: ISharedViewComponentProps) {
        super(props);
        this.state = defaultState;

        return;
    }

    public render() {
        if (this.state.loaded) {
            if (this.state.error) {
                return (
                    <div className="viewComponent">
                        <div>{this.state.error}</div>
                    </div>
                );
            }
            const { doc } = this.state;
            return (
                <div className="viewComponent">
                    <div className="document">
                        <div className="documentHeader">
                            <H1>{doc.name}</H1>
                        </div>
                        <div className="documentContents">
                            <Markdown
                                source={doc.content}
                                renderers={{
                                    code: CodeBlock,
                                }}
                            />
                        </div>
                    </div>
                </div>
            );
        } else {
            return <LoadingStub />;
        }
    }

    public async componentDidMount() {
        const { username, id } = this.props.match.params as any;
        const res = await fetchSharedDoc(username, id);
        if (!res.error) {
            this.setState({ loaded: true, doc: res.data });
        } else {
            this.setState({ loaded: true, error: res.error });
        }
    }
}

function mapStateToProps(state: IAppState) {
    return {
        loggedIn: state.user.user !== null,
        username: state.user.user.username,
    };
}

export const SharedView = SharedViewComponent;
