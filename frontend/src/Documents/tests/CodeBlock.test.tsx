import { mount } from "enzyme";
import * as React from "react";

import * as hljs from "highlight.js";
import { CodeBlock } from "../CodeBlock";

const highlightSpy = jest.spyOn(hljs, "highlightBlock");

afterEach(() => {
    jest.restoreAllMocks();
});

describe("<CodeBlock />", () => {
    it("should render code and highlight it when updated", () => {
        const text1 = `console.log("Hello")`;
        const text2 = `console.log("world")`;
        const wrapper = mount(<CodeBlock value={text1} language="js" />);

        expect(wrapper.find("pre")).toHaveLength(1);
        expect(wrapper.text()).toBe(text1);
        expect(highlightSpy).toHaveBeenCalledTimes(1);

        wrapper.setProps({ value: text2, language: "js" });
        expect(wrapper.text()).toBe(text2);
        expect(highlightSpy).toHaveBeenCalledTimes(2);
    });
});
