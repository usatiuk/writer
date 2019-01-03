import { fetchJSON, fetchJSONAuth } from "../utils";

export async function fetchUser() {
    return fetchJSONAuth("/users/user", "GET");
}
