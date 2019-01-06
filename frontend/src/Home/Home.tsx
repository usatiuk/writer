import {
    Alignment,
    Button,
    Classes,
    Menu,
    Navbar,
    Popover,
} from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { IUserJSON } from "~../../src/entity/User";
import { IAppState } from "~redux/reducers";
import { logoutUser } from "~redux/user/actions";

interface IHomeProps extends RouteComponentProps {
    user: IUserJSON | null;
    logout: () => void;
}

export class HomeComponent extends React.PureComponent<IHomeProps> {
    constructor(props: IHomeProps) {
        super(props);
    }

    public render() {
        return (
            this.props.user && (
                <>
                    <Navbar>
                        <Navbar.Group align={Alignment.LEFT}>
                            <Navbar.Heading>Writer</Navbar.Heading>
                            <Navbar.Divider />
                            <Button
                                className={Classes.MINIMAL}
                                icon="home"
                                text="Home"
                                active={this.props.location.pathname === "/"}
                                onClick={() => this.props.history.push("/")}
                            />
                            <Button
                                className={Classes.MINIMAL}
                                icon="document"
                                text="Files"
                                active={
                                    this.props.location.pathname === "/files"
                                }
                                onClick={() =>
                                    this.props.history.push("/files")
                                }
                            />
                        </Navbar.Group>
                        <Navbar.Group align={Alignment.RIGHT}>
                            <Popover
                                target={
                                    <Button id="userButton">
                                        {this.props.user.username}
                                    </Button>
                                }
                                content={
                                    <Menu>
                                        <Menu.Item
                                            icon="log-out"
                                            text="Logout"
                                            onClick={this.props.logout}
                                        />
                                    </Menu>
                                }
                            />
                        </Navbar.Group>
                    </Navbar>
                    <div id="MainScreen" />
                </>
            )
        );
    }
}

function mapStateToProps(state: IAppState) {
    return { user: state.user.user };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return { logout: () => dispatch(logoutUser()) };
}

export const Home = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(HomeComponent),
);
