import "./Docs.scss";

import { H3 } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IDocumentJSON } from "~../../src/entity/Document";
import { fetchDocsStart } from "~redux/docs/actions";
import { IAppState } from "~redux/reducers";

import { DocsList } from "./DocsList";

export interface IOverviewComponentProps {
    recent: IDocumentJSON[] | null;
    all: IDocumentJSON[] | null;
    fetching: boolean;

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
            return (
                <div id="overview">
                    <div className="section">
                        <H3>Recent</H3>
                        <DocsList docs={this.props.recent} />
                    </div>
                    <span className="separator" />
                    <div className="section">
                        <H3>All documents</H3>
                        <DocsList docs={this.props.all} />
                    </div>
                </div>
            );
        } else {
            return <div>Loading</div>;
        }
    }
}

function mapStateToProps(state: IAppState) {
    return {
        recent: state.docs.recent,
        all: state.docs.all,
        fetching: state.docs.fetching,
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
