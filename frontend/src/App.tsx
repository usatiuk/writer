import * as React from "react";
import { Route, Switch } from "react-router";
import { Login } from "~Auth/Login";
import { Home } from "~Home";

export function App() {
    return (
        <>
            <Switch>
                <Route exact={true} path="/" component={Home} />
                <Route path="/login" component={Login} />
            </Switch>
        </>
    );
}
