import "./Auth.scss";

import { Button, Card, FormGroup, H2, InputGroup } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { authStart } from "~redux/auth/actions";
import { IAppState } from "~redux/reducers";

interface ILoginComponentProps {
    inProgress: boolean;
    error: string;
    login: (username: string, password: string) => void;
}

interface ILoginComponentState {
    username: string;
    password: string;
}

export class LoginComponent extends React.PureComponent<
    ILoginComponentProps,
    ILoginComponentState
> {
    constructor(props: ILoginComponentProps) {
        super(props);
        this.submit = this.submit.bind(this);
        this.updateFields = this.updateFields.bind(this);
        this.state = { username: "", password: "" };
    }

    public submit() {
        const { username, password } = this.state;
        this.props.login(username, password);
    }

    public updateFields(e: React.FormEvent<HTMLInputElement>) {
        const { value, name } = e.currentTarget;
        this.setState({ ...this.state, [name]: value });
    }

    public render() {
        return (
            <>
                <Card className="AuthForm" elevation={2}>
                    <form>
                        <H2>Login</H2>
                        <FormGroup label="Username">
                            <InputGroup
                                name="username"
                                value={this.state.username}
                                onChange={this.updateFields}
                                leftIcon="person"
                            />
                        </FormGroup>
                        <FormGroup label="Password">
                            <InputGroup
                                name="password"
                                value={this.state.password}
                                onChange={this.updateFields}
                                type="password"
                                leftIcon="key"
                            />
                        </FormGroup>
                        <div className="buttons">
                            <div id="errors">{this.props.error}</div>
                            <Button
                                className="submit"
                                intent="primary"
                                onClick={this.submit}
                                active={!this.props.inProgress}
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                </Card>
            </>
        );
    }
}

function mapStateToProps(state: IAppState) {
    return { inProgress: state.auth.inProgress, error: state.auth.error };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        login: (username: string, password: string) =>
            dispatch(authStart(username, password)),
    };
}

export const Login = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginComponent);
