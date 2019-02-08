import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { IDocumentJSON } from "~../../src/entity/Document";
import { IAppState } from "~redux/reducers";

export interface IEditDocComponent extends RouteComponentProps {
    allDocs: IDocumentJSON[];
    doc: number;
}

export function EditDocComponent(props: IEditDocComponent) {
    if (props.allDocs) {
        const { id } = props.match.params as any;
        const doc = props.allDocs[id];
        return <div>{doc.name}</div>;
    } else {
        return <div />;
    }
}

function mapStateToProps(state: IAppState) {
    return { allDocs: state.docs.all };
}

export const EditDoc = withRouter(connect(mapStateToProps)(EditDocComponent));
