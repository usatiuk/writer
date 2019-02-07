import { H1 } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IDocumentJSON } from "~../../src/entity/Document";
import { fetchDocsStart } from "~redux/docs/actions";
import { IAppState } from "~redux/reducers";

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
        let docsList;
        if (this.props.all) {
            docsList = this.props.all.map(doc => (
                <div key={doc.id}>
                    <H1>{doc.name}</H1>
                    <p>{doc.content}</p>
                </div>
            ));
        }
        return docsList || <div>Loading</div>;
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
