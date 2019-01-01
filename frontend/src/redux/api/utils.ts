let token: string | null;

export function setToken(_token: string) {
    token = _token;
}

export function getToken() {
    return token;
}

export function deleteToken(_token: string) {
    token = null;
}

const root = "http://localhost:3000";

export async function fetchJSON(
    path: string,
    method: string,
    body: string | object,
    headers?: Record<string, string>,
) {
    if (typeof body === "object") {
        body = JSON.stringify(body);
    }
    const response = await fetch(root + path, {
        method,
        body,
        headers: {
            ...headers,
            "Content-Type": "application/json",
        },
    });
    const json = await response.json();
    return json;
}

export async function fetchJSONAuth(
    path: string,
    method: string,
    body: string | object,
    headers?: object,
) {
    if (token) {
        return fetchJSON(path, method, body, {
            ...headers,
            Authorization: `Bearer ${token}`,
        });
    }
}
