import { fetchJSON, fetchJSONAuth } from "../utils";

export async function fetchUser() {
    return fetchJSONAuth("/users/user", "GET");
}

export async function changeUserPassword(newPassword: string) {
    return fetchJSONAuth("/users/edit", "POST", { password: newPassword });
}
