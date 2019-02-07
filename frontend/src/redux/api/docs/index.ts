import { IDocumentJSON } from "~../../src/entity/Document";
import { IAPIResponse } from "~../../src/types";

import { fetchJSONAuth } from "../utils";

export async function fetchRecentDocs(): Promise<
    IAPIResponse<IDocumentJSON[]>
> {
    return fetchJSONAuth("/docs/list/recent", "GET");
}

export async function fetchAllDocs(): Promise<IAPIResponse<IDocumentJSON[]>> {
    return fetchJSONAuth("/docs/list", "GET");
}
