import * as React from "react";

import { H3 } from "@blueprintjs/core";
import { shallow } from "enzyme";
import { OverviewComponent } from "../Overview";

afterEach(() => {
    jest.restoreAllMocks();
});

describe("<CodeBlock />", () => {
    it("should not show recent docs if there aren't any", () => {
        const wrapper = shallow(
            <OverviewComponent
                allDocs={{}}
                fetching={false}
                spinner={false}
                fetchDocs={() => undefined}
            />,
        );

        expect(wrapper.find(H3)).toHaveLength(1);
    });

    it("show recent docs if there are some", () => {
        const wrapper = shallow(
            <OverviewComponent
                allDocs={{ 1: { id: 1 } } as any}
                fetching={false}
                spinner={false}
                fetchDocs={() => undefined}
            />,
        );

        expect(wrapper.find(H3)).toHaveLength(2);
    });
});
