import { IDocumentJSON } from "~../../src/entity/Document";
import { IAPIResponse } from "~../../src/types";

import { fetchJSON, fetchJSONAuth } from "../utils";

export async function fetchRecentDocs(): Promise<
    IAPIResponse<IDocumentJSON[]>
> {
    return (fetchJSONAuth("/docs/list/recent", "GET") as unknown) as Promise<
    IAPIResponse<IDocumentJSON[]>
>;
}

export async function fetchAllDocs(): Promise<IAPIResponse<IDocumentJSON[]>> {
    return (fetchJSONAuth("/docs/list", "GET") as unknown) as Promise<IAPIResponse<IDocumentJSON[]>>;
}

export async function fetchDoc(
    id: number,
): Promise<IAPIResponse<IDocumentJSON>> {
    return fetchJSONAuth(`/docs/byID/${id}`, "GET") as unknown as Promise<IAPIResponse<IDocumentJSON>>;
}

export async function fetchSharedDoc(
    username: string,
    id: number,
): Promise<IAPIResponse<IDocumentJSON>> {
    return fetchJSON(`/docs/shared/${username}/${id}`, "GET") as unknown as Promise<IAPIResponse<IDocumentJSON>>;
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
    }) as unknown as Promise<IAPIResponse<IDocumentJSON>>;
}

export async function deleteDoc(id: number): Promise<IAPIResponse<boolean>> {
    return fetchJSONAuth(`/docs/byID/${id}`, "DELETE") as unknown as Promise<IAPIResponse<boolean>>;
}

export async function createNewDoc(): Promise<IAPIResponse<IDocumentJSON>> {
    return fetchJSONAuth(`/docs/new`, "POST", { name: "New Document" }) as unknown as Promise<IAPIResponse<IDocumentJSON>> ;
}
