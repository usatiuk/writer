import { mount } from "enzyme";
import * as React from "react";

import ReactMarkdown = require("react-markdown");
import { Redirect } from "react-router";
import { SharedViewComponent } from "~Documents/SharedView";
import { LoadingStub } from "~LoadingStub";
import { fetchSharedDoc } from "~redux/api/docs";
import { IDocumentEntry } from "~redux/docs/reducer";
import { flushPromises } from "~tests/utils";
import { IDocumentJSON } from "../../../../src/entity/Document";

const testDoc: IDocumentJSON = {
    name: "not changed",
    content: "not changed",
    id: 1,
    user: 1,
    createdAt: 0,
    editedAt: 0,
    shared: false,
};

jest.mock("~redux/api/docs");
jest.mock("react-router");

describe("<SharedView />", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should redirect if the user's the same", async () => {
        (fetchSharedDoc as any).mockReturnValue(
            Promise.resolve({ error: null, data: testDoc }),
        );
        (Redirect as any).mockReturnValue(<div>test</div>);

        const wrapper = mount(
            <SharedViewComponent
                loggedIn={true}
                user={{ id: 1, username: "user" }}
                history={{} as any}
                location={{} as any}
                match={{ params: { id: 1, username: "user" } } as any}
            />,
        );

        // async componentDidMount creates some problems
        await flushPromises();
        wrapper.update();

        expect(wrapper.find(Redirect)).toHaveLength(1);
    });

    it("shouldn't redirect if the user's different", async () => {
        (fetchSharedDoc as any).mockReturnValue(
            Promise.resolve({ error: null, data: testDoc }),
        );
        (Redirect as any).mockReturnValue(<div>test</div>);

        const wrapper = mount(
            <SharedViewComponent
                loggedIn={true}
                user={{ id: 2, username: "user2" }}
                history={{} as any}
                location={{} as any}
                match={{ params: { id: 1, username: "user" } } as any}
            />,
        );

        // async componentDidMount creates some problems
        await flushPromises();
        wrapper.update();

        expect(wrapper.find(Redirect)).toHaveLength(0);
        expect(wrapper.find(ReactMarkdown)).toHaveLength(1);
    });

    it("should show an error if there's one", async () => {
        const testError = "Not Found";
        (fetchSharedDoc as any).mockReturnValue(
            Promise.resolve({ error: testError, data: null }),
        );
        (Redirect as any).mockReturnValue(<div>test</div>);

        const wrapper = mount(
            <SharedViewComponent
                loggedIn={true}
                user={{ id: 1, username: "user1" }}
                history={{} as any}
                location={{} as any}
                match={{ params: { id: 1, username: "user1" } } as any}
            />,
        );

        // async componentDidMount creates some problems
        await flushPromises();
        wrapper.update();

        expect(wrapper.contains(testError)).toBeTruthy();
    });
});
