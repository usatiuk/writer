import * as React from "react";
import { connect } from "react-redux";
import {
    Redirect,
    Route,
    RouteComponentProps,
    Switch,
    withRouter,
} from "react-router";
import { AuthScreen } from "~Auth/AuthScreen";
import { Home } from "~Home/Home";
import { Landing } from "~Landing/Landing";
import { IAppState } from "~redux/reducers";

interface IAppComponentProps extends RouteComponentProps {
    loggedIn: boolean;
}

export function AppComponent(props: IAppComponentProps) {
    const { loggedIn } = props;
    const { location } = props.history;
    return (
        <>
            <Switch>
                <Route
                    exact={true}
                    path="/"
                    component={() => (loggedIn ? <Home /> : <Landing />)}
                />
                <Route
                    path="/files"
                    component={() =>
                        loggedIn ? <Home /> : <Redirect to="/login" />
                    }
                />
                <Route path="/(login|signup)/" component={AuthScreen} />
            </Switch>
        </>
    );
}

function mapStateToProps(state: IAppState) {
    return { loggedIn: !(state.auth.jwt === null) };
}

export const App = withRouter(connect(mapStateToProps)(AppComponent));
