import { fetchJSON } from "../utils";

export async function login(username: string, password: string) {
    return fetchJSON("/users/login", "POST", {
        username,
        password,
    });
}

export async function signup(
    username: string,
    password: string,
    email: string,
) {
    return fetchJSON("/users/signup", "POST", {
        username,
        password,
        email,
    });
}
