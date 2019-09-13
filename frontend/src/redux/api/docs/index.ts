import { IDocumentJSON } from "~../../src/entity/Document";
import { IAPIResponse } from "~../../src/types";

import { fetchJSONAuth, fetchJSON } from "../utils";

export async function fetchRecentDocs(): Promise<
    IAPIResponse<IDocumentJSON[]>
> {
    return fetchJSONAuth("/docs/list/recent", "GET");
}

export async function fetchAllDocs(): Promise<IAPIResponse<IDocumentJSON[]>> {
    return fetchJSONAuth("/docs/list", "GET");
}

export async function fetchDoc(
    id: number,
): Promise<IAPIResponse<IDocumentJSON>> {
    return fetchJSONAuth(`/docs/byID/${id}`, "GET");
}

export async function fetchSharedDoc(
    username: string,
    id: number,
): Promise<IAPIResponse<IDocumentJSON>> {
    return fetchJSON(`/docs/shared/${username}/${id}`, "GET");
}

export async function patchDoc(
    id: number,
    name?: string,
    content?: string,
    shared?: boolean,
): Promise<IAPIResponse<IDocumentJSON>> {
    return fetchJSONAuth(`/docs/byID/${id}`, "PATCH", {
        name,
        content,
        shared,
    });
}

export async function deleteDoc(id: number): Promise<IAPIResponse<boolean>> {
    return fetchJSONAuth(`/docs/byID/${id}`, "DELETE");
}

export async function createNewDoc(): Promise<IAPIResponse<IDocumentJSON>> {
    return fetchJSONAuth(`/docs/new`, "POST", { name: "New Document" });
}
