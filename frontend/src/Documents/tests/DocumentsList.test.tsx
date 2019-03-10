import { shallow } from "enzyme";
import * as React from "react";

import { NewDocumentCard } from "~Documents/NewDocumentCard";
import { DocumentsList } from "../DocumentsList";

describe("<DocumentsList />", () => {
    it("should render NewDocumentCard if newDocument prop is true", () => {
        const wrapper = shallow(<DocumentsList docs={[]} newDocument={true} />);
        expect(wrapper.find(NewDocumentCard)).toHaveLength(1);
    });

    it("should render NewDocumentCard if newDocument prop is undefined", () => {
        const wrapper = shallow(<DocumentsList docs={[]} />);
        expect(wrapper.find(NewDocumentCard)).toHaveLength(0);
    });
});
