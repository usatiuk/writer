import { Position, Toaster } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router";
import { AuthScreen } from "~Auth/AuthScreen";
import { Home } from "~Home/Home";
import { Landing } from "~Landing/Landing";
import { IAppState } from "~redux/reducers";

export const AppToaster = Toaster.create({
    className: "recipe-toaster",
    position: Position.TOP,
});

interface IAppComponentProps extends RouteComponentProps {
    loggedIn: boolean;
}

export function AppComponent(props: IAppComponentProps) {
    const { loggedIn } = props;
    const { location } = props.history;
    return loggedIn ? (
        <Switch>
            <Route path="/signup" component={AuthScreen} />,
            <Route path="/login" component={AuthScreen} />,
            <Route path="/docs/:id" component={Home} />,
            <Route path="/" component={Home} />,
        </Switch>
    ) : (
        <Switch>
            <Route path="/signup" component={AuthScreen} />
            <Route path="/login" component={AuthScreen} />
            <Route exact={true} path="/" component={Landing} />
        </Switch>
    );
}

function mapStateToProps(state: IAppState) {
    return { loggedIn: !(state.auth.jwt === null) };
}

export const App = withRouter(connect(mapStateToProps)(AppComponent));
