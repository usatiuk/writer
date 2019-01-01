import { Alignment, Button, Classes, Navbar } from "@blueprintjs/core";
import * as React from "react";

export function Home() {
    return (
        <>
            {" "}
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>Writer</Navbar.Heading>
                    <Navbar.Divider />
                    <Button
                        className={Classes.MINIMAL}
                        icon="home"
                        text="Home"
                    />
                    <Button
                        className={Classes.MINIMAL}
                        icon="document"
                        text="Files"
                    />
                </Navbar.Group>
            </Navbar>
        </>
    );
}
