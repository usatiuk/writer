import "./Docs.scss";

import { Button, H1 } from "@blueprintjs/core";
import * as React from "react";
import Markdown from "react-markdown";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { IDocumentJSON } from "~../../src/entity/Document";
import { LoadingStub } from "~LoadingStub";
import { fetchDocsStart } from "~redux/docs/actions";
import { IAppState } from "~redux/reducers";
import { CodeBlock } from "./CodeBlock";

export interface IDocumentViewComponentProps extends RouteComponentProps {
    allDocs: { [key: number]: IDocumentJSON };

    fetching: boolean;
    spinner: boolean;

    fetchDocs: () => void;
}

export class DocumentViewComponent extends React.PureComponent<
    IDocumentViewComponentProps,
    null
> {
    public render() {
        const { id } = this.props.match.params as any;
        if (this.props.allDocs && this.props.allDocs[id]) {
            const doc = this.props.allDocs[id];
            return (
                <div className="document">
                    <div className="documentHeader">
                        <H1>{doc.name}</H1>
                        <div className="buttons">
                            <Button
                                icon="edit"
                                minimal={true}
                                onClick={() =>
                                    this.props.history.push(`/docs/${id}/edit`)
                                }
                            />
                        </div>
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
            );
        } else {
            return this.props.spinner && <LoadingStub />;
        }
    }

    public componentDidUpdate() {
        if (!this.props.allDocs && !this.props.fetching) {
            this.props.fetchDocs();
        }
    }

    public componentDidMount() {
        if (!this.props.allDocs && !this.props.fetching) {
            this.props.fetchDocs();
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
    };
}

export const DocumentView = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(DocumentViewComponent),
);
