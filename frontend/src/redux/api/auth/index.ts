import { fetchJSON } from "../utils";

export async function login(username: string, password: string) {
    return fetchJSON("/users/login", "POST", {
        username,
        password,
    });
}
