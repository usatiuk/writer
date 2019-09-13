import "./Home.scss";

import {
    Alignment,
    Breadcrumbs,
    Button,
    Classes,
    IBreadcrumbProps,
    Icon,
    Menu,
    Navbar,
    Popover,
    Spinner,
} from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router";
import { animated, config, Transition } from "react-spring/renderprops";
import { Dispatch } from "redux";
import { IDocumentJSON } from "~../../src/entity/Document";
import { IUserJSON } from "~../../src/entity/User";
import { DocumentEdit } from "~Documents/DocumentEdit";
import { DocumentView } from "~Documents/DocumentView";
import { Overview } from "~Documents/Overview";
import { toggleDarkMode } from "~redux/localSettings/actions";
import { IAppState } from "~redux/reducers";
import { logoutUser } from "~redux/user/actions";

export interface IHomeProps extends RouteComponentProps {
    allDocs: { [key: number]: IDocumentJSON };
    user: IUserJSON | null;

    fetching: boolean;
    uploading: boolean;
    dirty: boolean;

    darkMode: boolean;

    logout: () => void;
    dispatchToggleDarkMode: () => void;
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
            if (this.props.allDocs[id]) {
                breadcrumbs.push({
                    icon: "document",
                    text: this.props.allDocs[id].name,
                    onClick: () => this.props.history.push(`/docs/${id}`),
                });
            }
        }

        return (
            this.props.user && (
                <div
                    id="mainContainer"
                    className={this.props.darkMode ? Classes.DARK : undefined}
                >
                    <Navbar fixedToTop={true}>
                        <Navbar.Group align={Alignment.LEFT}>
                            <Navbar.Heading>Writer</Navbar.Heading>
                            <Navbar.Divider />
                            <Breadcrumbs items={breadcrumbs} />
                        </Navbar.Group>
                        <Navbar.Group align={Alignment.RIGHT}>
                            <Button id="uploadingStatusButton">
                                {this.props.uploading || this.props.dirty ? (
                                    <Spinner size={20} />
                                ) : (
                                    <Icon icon="saved" />
                                )}
                            </Button>
                            <Popover
                                target={
                                    <Button id="userButton">
                                        {this.props.user.username}
                                    </Button>
                                }
                                content={this.menu()}
                            />
                        </Navbar.Group>
                    </Navbar>
                    <div id="MainScreen" className="animationWrapper">
                        <Transition
                            native={true}
                            config={{
                                ...config.default,
                                clamp: true,
                                precision: 0.1,
                            }}
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
                                <animated.div
                                    style={style}
                                    className="viewComponent"
                                >
                                    <Switch location={_location}>
                                        <Route
                                            path="/docs/:id/edit"
                                            component={DocumentEdit}
                                        />
                                        <Route
                                            path="/docs/:id"
                                            component={DocumentView}
                                        />
                                        <Route path="/" component={Overview} />
                                    </Switch>
                                </animated.div>
                            )}
                        </Transition>
                    </div>
                </div>
            )
        );
    }

    private menu() {
        return (
            <Menu>
                <Menu.Item
                    icon="log-out"
                    text="Logout"
                    onClick={this.props.logout}
                />
                {this.props.darkMode ? (
                    <Menu.Item
                        icon="flash"
                        text="Light Mode"
                        onClick={this.props.dispatchToggleDarkMode}
                    />
                ) : (
                    <Menu.Item
                        icon="moon"
                        text="Dark Mode"
                        onClick={this.props.dispatchToggleDarkMode}
                    />
                )}
            </Menu>
        );
    }
}

function mapStateToProps(state: IAppState) {
    return {
        allDocs: state.docs.all,
        user: state.user.user,
        darkMode: state.localSettings.darkMode,
        fetching: state.docs.fetching,
        uploading: state.docs.uploading,
        dirty: state.docs.dirty,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        logout: () => dispatch(logoutUser()),
        dispatchToggleDarkMode: () => dispatch(toggleDarkMode()),
    };
}

export const Home = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(HomeComponent),
);
