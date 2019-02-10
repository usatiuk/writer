import "./Docs.scss";

import { H3 } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IDocumentJSON } from "~../../src/entity/Document";
import { LoadingStub } from "~LoadingStub";
import { fetchDocsStart } from "~redux/docs/actions";
import { IAppState } from "~redux/reducers";

import { DocumentsList } from "./DocumentsList";

export interface IOverviewComponentProps {
    allDocs: { [key: number]: IDocumentJSON };
    fetching: boolean;
    spinner: boolean;

    fetchDocs: () => void;
}

export class OverviewComponent extends React.PureComponent<
    IOverviewComponentProps,
    null
> {
    constructor(props: IOverviewComponentProps) {
        super(props);
    }

    public componentDidMount() {
        if (!this.props.allDocs) {
            this.props.fetchDocs();
        }
    }

    public render() {
        if (this.props.allDocs) {
            const docs = Object.values(this.props.allDocs);
            const recent = [...docs];
            recent.sort((a, b) => b.editedAt - a.editedAt);
            const recentCut = recent.splice(0, 4);
            return (
                <div id="overview">
                    <div className="section">
                        <H3>Recent</H3>
                        <DocumentsList docs={recentCut} />
                    </div>
                    <span className="separator" />
                    <div className="section">
                        <H3>All documents</H3>
                        <DocumentsList docs={docs} newDocument={true} />
                    </div>
                </div>
            );
        } else {
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
    };
}

export const Overview = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OverviewComponent);
