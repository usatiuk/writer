import { shallow } from "enzyme";
import * as React from "react";

import { Icon, Spinner } from "@blueprintjs/core";
import { HomeComponent, IHomeProps } from "../Home";

const defaultHomeProps: IHomeProps = {
    allDocs: {},
    user: { id: 1, username: "test" },

    fetching: false,
    uploading: false,

    darkMode: false,

    logout: jest.fn(),
    dispatchToggleDarkMode: jest.fn(),

    history: { location: { pathname: "/" } } as any,
    location: { pathname: "/" } as any,
    match: {
        params: {
            id: null,
        },
    } as any,
};

describe("<Home />", () => {
    it("should show a spinner when uploading", () => {
        const wrapper = shallow(
            <HomeComponent {...defaultHomeProps} uploading={true} />,
        );
        expect(
            wrapper.find("#uploadingStatusButton").find(Spinner),
        ).toHaveLength(1);
        expect(wrapper.find("#uploadingStatusButton").find(Icon)).toHaveLength(
            0,
        );
    });

    it("should show a saved icon when not uploading", () => {
        const wrapper = shallow(
            <HomeComponent {...defaultHomeProps} uploading={false} />,
        );
        expect(
            wrapper.find("#uploadingStatusButton").find(Spinner),
        ).toHaveLength(0);
        expect(wrapper.find("#uploadingStatusButton").find(Icon)).toHaveLength(
            1,
        );
    });
});
