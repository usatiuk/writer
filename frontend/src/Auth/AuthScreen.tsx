import * as React from "react";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router";
import { Transition } from "react-spring";

import { Login } from "./Login";
import { Signup } from "./Signup";

export function AuthScreenComponent(props: RouteComponentProps) {
    const { location } = props.history;
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
            }}
        >
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
                {_location => style => (
                    <div style={style}>
                        <Switch location={_location}>
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={Signup} />
                        </Switch>
                    </div>
                )}
            </Transition>
        </div>
    );
}

export const AuthScreen = withRouter(AuthScreenComponent);
