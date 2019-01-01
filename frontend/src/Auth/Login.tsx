import "./Auth.scss";

import { Button, Card, FormGroup, H2, InputGroup } from "@blueprintjs/core";
import * as React from "react";

export function Login() {
    return (
        <>
            <Card className="AuthForm" elevation={2}>
                <form>
                    <H2>Login</H2>
                    <FormGroup label="Username">
                        <InputGroup leftIcon="person" />
                    </FormGroup>
                    <FormGroup label="Password">
                        <InputGroup leftIcon="key" />
                    </FormGroup>
                    <div className="buttons">
                        <Button className="submit" intent="primary">
                            Login
                        </Button>
                    </div>
                </form>
            </Card>
        </>
    );
}
