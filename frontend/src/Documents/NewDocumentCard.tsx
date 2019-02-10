import { Card, Icon } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { newDocReset, newDocStart } from "~redux/docs/actions";
import { IAppState } from "~redux/reducers";

export interface INewDocumentCardComponentProps extends RouteComponentProps {
    createNewDoc: () => void;
    reset: () => void;

    newDocumentID: number | null;
}

export function NewDocumentCardComponent(
    props: INewDocumentCardComponentProps,
) {
    if (!props.newDocumentID) {
        return (
            <Card
                className="card newDocumentCard"
                interactive={true}
                onClick={() => props.createNewDoc()}
            >
                <Icon icon="add" iconSize={40} className="newDocumentIcon" />
            </Card>
        );
    } else {
        props.reset();
        props.history.push(`/docs/${props.newDocumentID}/edit`);
        return null;
    }
}

function mapStateToProps(state: IAppState) {
    return { newDocumentID: state.docs.newDocumentID };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        createNewDoc: () => dispatch(newDocStart()),
        reset: () => dispatch(newDocReset()),
    };
}

export const NewDocumentCard = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(NewDocumentCardComponent),
);
