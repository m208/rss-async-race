import { ICar } from "./types";

const baseApiUrl = 'https://rss-async-race-api.herokuapp.com'
const baseApiUrl2 = 'http://127.0.0.1:3000'

export async function getCars() {
    const url = baseApiUrl + `/garage`;
    const data: ICar[] = await getJson(url, 'GET');
    return data;
}





export async function getJson<TResponse>(url: string, method: string): Promise<TResponse> {
    const response = await fetch(url, { method });

    if (response.status === 200) {
        return response.json();
    }

    throw new Error(response.status.toString());
}

