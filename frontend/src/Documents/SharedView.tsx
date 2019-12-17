import "./Docs.scss";

import { Button, H1 } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { IDocumentJSON } from "~../../src/entity/Document";
import { LoadingStub } from "~LoadingStub";
import { NotFound } from "~NotFound";
import { fetchSharedDoc } from "~redux/api/docs";
import { fetchDocsStart } from "~redux/docs/actions";
import { IAppState } from "~redux/reducers";
import { IUserJSON } from "../../../src/entity/User";
import { CodeBlock } from "./CodeBlock";

// Jest for some reason breaks if we do it the other way
import Markdown = require("react-markdown");

export interface ISharedViewComponentProps extends RouteComponentProps {
    loggedIn: boolean;
    user: IUserJSON | undefined;
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
        if (!this.state.loaded) {
            return <LoadingStub />;
        }
        if (this.state.error) {
            return (
                <div className="viewComponent">
                    <div>{this.state.error}</div>
                </div>
            );
        }
        const { loggedIn, user } = this.props;
        const { doc } = this.state;
        if (loggedIn && user.id === doc.user) {
            return <Redirect to={`/docs/${doc.id}`} />;
        }
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
        user: state.user.user,
    };
}

export const SharedView = withRouter(
    connect(mapStateToProps)(SharedViewComponent),
);
