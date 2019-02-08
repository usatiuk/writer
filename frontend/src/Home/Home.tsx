import "./Home.scss";

import {
    Alignment,
    Breadcrumbs,
    Button,
    IBreadcrumbProps,
    Menu,
    Navbar,
    Popover,
} from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router";
import { Transition } from "react-spring/renderprops";
import { Dispatch } from "redux";
import { IDocumentJSON } from "~../../src/entity/Document";
import { IUserJSON } from "~../../src/entity/User";
import { EditDoc } from "~Documents/EditDoc";
import { Overview } from "~Documents/Overview";
import { IAppState } from "~redux/reducers";
import { logoutUser } from "~redux/user/actions";

interface IHomeProps extends RouteComponentProps {
    allDocs: { [key: number]: IDocumentJSON };
    user: IUserJSON | null;
    logout: () => void;
}

export class HomeComponent extends React.PureComponent<IHomeProps> {
    constructor(props: IHomeProps) {
        super(props);
    }

    public render() {
        const { location } = this.props.history;

        const breadcrumbs: IBreadcrumbProps[] = [
            {
                icon: "home",
                text: "Home",
                onClick: () => this.props.history.push("/"),
            },
        ];

        if ((this.props.match.params as any).id && this.props.allDocs) {
            const { id } = this.props.match.params as any;
            breadcrumbs.push({
                icon: "document",
                text: this.props.allDocs[id].name,
                onClick: () => this.props.history.push(`/docs/${id}`),
            });
        }

        return (
            this.props.user && (
                <>
                    <Navbar fixedToTop={true}>
                        <Navbar.Group align={Alignment.LEFT}>
                            <Navbar.Heading>Writer</Navbar.Heading>
                            <Navbar.Divider />
                            <Breadcrumbs items={breadcrumbs} />
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
                    <div id="MainScreen" className="animationWrapper">
                        <Transition
                            items={location}
                            keys={location.pathname}
                            from={{
                                opacity: 0,
                                transform: "translate3d(-400px,0,0)",
                            }}
                            enter={{
                                opacity: 1,
                                transform: "translate3d(0,0,0)",
                            }}
                            leave={{
                                opacity: 0,
                                transform: "translate3d(400px,0,0)",
                            }}
                        >
                            {(_location: any) => (style: any) => (
                                <div style={style} className="viewComponent">
                                    <Switch location={_location}>
                                        <Route
                                            path="/docs/:id"
                                            component={EditDoc}
                                        />
                                        <Route path="/" component={Overview} />
                                    </Switch>
                                </div>
                            )}
                        </Transition>
                    </div>
                </>
            )
        );
    }
}

function mapStateToProps(state: IAppState) {
    return { allDocs: state.docs.all, user: state.user.user };
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
