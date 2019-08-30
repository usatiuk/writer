import { mount } from "enzyme";
import * as React from "react";

import { DocumentEditComponent } from "../DocumentEdit";

const mock: any = jest.fn();

const onUnloadSpy = jest.spyOn(DocumentEditComponent.prototype, "onUnload");

const testDoc = {
    1: {
        name: "not changed",
        content: "not changed",
        id: 1,
        user: 1,
        createdAt: 0,
        editedAt: 0,
    },
};

afterEach(() => {
    jest.restoreAllMocks();
});

describe("<DocumentEdit />", () => {
    it("should warn before exiting with unsaved changes", () => {
        // https://medium.com/@DavideRama/testing-global-event-listener-within-a-react-component-b9d661e59953
        const map: { [key: string]: any } = {};
        window.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });

        const wrapper = mount(
            <DocumentEditComponent
                allDocs={testDoc}
                fetching={false}
                spinner={false}
                fetchDocs={mock}
                cancelDelete={mock}
                deleteDoc={mock}
                uploadDoc={mock}
                history={mock}
                location={mock}
                match={{ params: { id: 1 } } as any}
            />,
        );

        const content = wrapper.find("textarea");
        expect(content).toHaveLength(1);
        (content.instance() as any).value = "changed";

        content.simulate("change");

        const preventDefault = jest.fn();
        const event = { preventDefault };
        map.beforeunload(event);

        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(onUnloadSpy).toHaveBeenCalledTimes(1);
    });

    it("shouldn't warn before exiting with no changes", () => {
        const map: { [key: string]: any } = {};
        window.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });

        const wrapper = mount(
            <DocumentEditComponent
                allDocs={testDoc}
                fetching={false}
                spinner={false}
                fetchDocs={mock}
                cancelDelete={mock}
                deleteDoc={mock}
                uploadDoc={mock}
                history={mock}
                location={mock}
                match={{ params: { id: 1 } } as any}
            />,
        );

        const content = wrapper.find("textarea");
        expect(content).toHaveLength(1);

        (content.instance() as any).value = "changed";
        content.simulate("change");

        (content.instance() as any).value = "not changed";
        content.simulate("change");

        const preventDefault = jest.fn();
        const event = { preventDefault };
        map.beforeunload(event);

        expect(onUnloadSpy).toHaveBeenCalledTimes(1);
        expect(preventDefault).toHaveBeenCalledTimes(0);
    });
});
