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
import { Dispatch } from "redux";
import { IDocumentJSON } from "~../../src/entity/Document";
import { IUserJSON } from "~../../src/entity/User";
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
                    <Navbar>
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
                    <div id="MainScreen">
                        <Switch>
                            <Route exact={true} path="/" component={Overview} />
                            <Route path="/docs/:id" component={Overview} />
                        </Switch>
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
