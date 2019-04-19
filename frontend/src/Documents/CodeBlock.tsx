/* tslint:disable: blueprint-html-components */

import hljs from "highlight.js";
import * as React from "react";

import "./CodeBlock.scss";

export interface ICodeBlockProps {
    value: string;
    language?: string;
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
        return (
            <pre>
                <code
                    ref={this.setRef}
                    className={"lang-" + this.props.language}
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
