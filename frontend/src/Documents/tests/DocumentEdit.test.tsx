import { mount } from "enzyme";
import * as React from "react";

import { IDocumentEntry } from "~redux/docs/reducer";
import { IDocumentJSON } from "../../../../src/entity/Document";
import { DocumentEditComponent } from "../DocumentEdit";

const mock: any = jest.fn();

const onUnloadSpy = jest.spyOn(DocumentEditComponent.prototype, "onUnload");

const testDoc: IDocumentJSON = {
    name: "not changed",
    content: "not changed",
    id: 1,
    user: 1,
    createdAt: 0,
    editedAt: 0,
};

const testDocsChanged: { [key: number]: IDocumentEntry } = {
    1: {
        ...testDoc,
        name: "changed",
        content: "changed",
        remote: {
            ...testDoc,
        },
        dirty: true,
    },
};

const testDocsNotChanged: { [key: number]: IDocumentEntry } = {
    1: {
        ...testDoc,
        remote: {
            ...testDoc,
        },
        dirty: false,
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
                allDocs={testDocsChanged}
                fetching={false}
                spinner={false}
                fetchDocs={mock}
                cancelDelete={mock}
                deleteDoc={mock}
                uploadDocs={mock}
                updateDoc={mock}
                history={mock}
                location={mock}
                match={{ params: { id: 1 } } as any}
            />,
        );

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
                allDocs={testDocsNotChanged}
                fetching={false}
                spinner={false}
                fetchDocs={mock}
                cancelDelete={mock}
                deleteDoc={mock}
                uploadDocs={mock}
                updateDoc={mock}
                history={mock}
                location={mock}
                match={{ params: { id: 1 } } as any}
            />,
        );

        const preventDefault = jest.fn();
        const event = { preventDefault };
        map.beforeunload(event);

        expect(onUnloadSpy).toHaveBeenCalledTimes(1);
        expect(preventDefault).toHaveBeenCalledTimes(0);
    });
});
