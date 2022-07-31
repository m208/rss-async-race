import { ICar } from "../types/types";

const baseApiUrl2 = 'https://rss-async-race-api.herokuapp.com'
const baseApiUrl = 'http://127.0.0.1:3000'



export const model = {

    getCars: async () => {
        const url = baseApiUrl + `/garage`;
        const data: ICar[] = await getJson(url, 'GET');
        return data;
    },

    deleteCar: async (id: number) => {
        const url = baseApiUrl + `/garage/${id}`;
        const data: string = await getJson(url, 'DELETE');
        return data;
    }


}




// export async function getCars() {
//     const url = baseApiUrl + `/garage`;
//     const data: ICar[] = await getJson(url, 'GET');
//     return data;
// }

// export async function deleteCar(id: number) {
//     const url = baseApiUrl + `/garage/:${id}}`;
//     const data: string = await getJson(url, 'DELETE');
//     console.log(data);

//     return data;
// }





export async function getJson<TResponse>(url: string, method: string): Promise<TResponse> {
    const response = await fetch(url, { method });

    if (response.status === 200) {
        return response.json();
    }

    throw new Error(response.status.toString());
}

