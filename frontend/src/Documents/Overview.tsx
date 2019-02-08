import "./Docs.scss";

import { H3 } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IDocumentJSON } from "~../../src/entity/Document";
import { LoadingStub } from "~LoadingStub";
import { fetchDocsStart } from "~redux/docs/actions";
import { IAppState } from "~redux/reducers";

import { DocsList } from "./DocsList";

export interface IOverviewComponentProps {
    all: { [key: number]: IDocumentJSON };
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
        if (!this.props.all) {
            this.props.fetchDocs();
        }
    }

    public render() {
        if (this.props.all) {
            const docs = Object.values(this.props.all);
            const recent = [...docs];
            recent.sort((a, b) => b.editedAt - a.editedAt);
            const recentCut = recent.splice(0, 4);
            return (
                <div id="overview">
                    <div className="section">
                        <H3>Recent</H3>
                        <DocsList docs={recentCut} />
                    </div>
                    <span className="separator" />
                    <div className="section">
                        <H3>All documents</H3>
                        <DocsList docs={docs} />
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
        all: state.docs.all,
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
