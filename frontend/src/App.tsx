import * as React from "react";
import { Route, RouteComponentProps, withRouter } from "react-router";
import { AuthScreen } from "~Auth/AuthScreen";
import { Home } from "~Home";

export function AppComponent(props: RouteComponentProps) {
    const { location } = props.history;
    return (
        <>
            <Route exact={true} path="/" component={Home} />
            <Route path="/(login|signup)/" component={AuthScreen} />
        </>
    );
}

export const App = withRouter(AppComponent);
