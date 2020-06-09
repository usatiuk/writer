import * as React from "react";

import { shallow } from "enzyme";
import { AccountComponent } from "../Account";

describe("<Account />", () => {
    it("should say hello", () => {
        const wrapper = shallow(<AccountComponent />);

        expect(wrapper.text()).toBe("Hello");
    });
});
