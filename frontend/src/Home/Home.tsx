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
import { Dispatch } from "redux";
import { IUserJSON } from "~../../src/entity/User";
import { IAppState } from "~redux/reducers";
import { logoutUser } from "~redux/user/actions";

interface IHomeProps {
    user: IUserJSON | null;
    logout: () => void;
}

export class HomeComponent extends React.PureComponent<IHomeProps> {
    constructor(props: IHomeProps) {
        super(props);
    }

    public render() {
        return (
            <>
                {this.props.user && (
                    <>
                        <Navbar>
                            <Navbar.Group align={Alignment.LEFT}>
                                <Navbar.Heading>Writer</Navbar.Heading>
                                <Navbar.Divider />
                                <Button
                                    className={Classes.MINIMAL}
                                    icon="home"
                                    text="Home"
                                />
                                <Button
                                    className={Classes.MINIMAL}
                                    icon="document"
                                    text="Files"
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
                    </>
                )}
            </>
        );
    }
}

function mapStateToProps(state: IAppState) {
    return { user: state.user.user };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return { logout: () => dispatch(logoutUser()) };
}

export const Home = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeComponent);
