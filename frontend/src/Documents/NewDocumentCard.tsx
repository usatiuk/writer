import { Card, Icon } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { RouteChildrenProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { newDocStart } from "~redux/docs/actions";

export interface INewDocumentCardComponentProps extends RouteChildrenProps {
    createNewDoc: () => void;
}

export function NewDocumentCardComponent(
    props: INewDocumentCardComponentProps,
) {
    return (
        <Card
            className="card newDocumentCard"
            interactive={true}
            onClick={() => props.createNewDoc()}
        >
            <Icon icon="add" iconSize={40} className="newDocumentIcon" />
        </Card>
    );
}

function mapDispatchToProps(dispatch: Dispatch) {
    return { createNewDoc: () => dispatch(newDocStart()) };
}

export const NewDocumentCard = withRouter(
    connect(
        null,
        mapDispatchToProps,
    )(NewDocumentCardComponent),
);
