/* tslint:disable: blueprint-html-components */

import hljs from "highlight.js";
import * as React from "react";

import * as darkStyle from "highlight.js/styles/a11y-dark.css";
import * as lightStyle from "highlight.js/styles/a11y-light.css";

export interface ICodeBlockProps {
    value: string;
    language?: string;

    darkMode: boolean;
}

interface ICodeBlockState {
    ref: HTMLElement | null;
}

export class CodeBlock extends React.PureComponent<
    ICodeBlockProps,
    ICodeBlockState
> {
    constructor(props: ICodeBlockProps) {
        super(props);

        this.setRef = this.setRef.bind(this);
        this.state = { ref: null };
    }

    public render() {
        console.log(darkStyle);
        return (
            <pre>
                <code
                    ref={this.setRef}
                    className={"lang-" + this.props.language}
                    style={this.props.darkMode ? darkStyle : lightStyle}
                >
                    {this.props.value}
                </code>
            </pre>
        );
    }

    public componentDidMount() {
        this.highlightCode();
    }

    public componentDidUpdate() {
        this.highlightCode();
    }

    private highlightCode() {
        if (this.state.ref) {
            hljs.highlightBlock(this.state.ref);
        }
    }

    private setRef(ref: HTMLElement) {
        this.setState({ ref });
    }
}
