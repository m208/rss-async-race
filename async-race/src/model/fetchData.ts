import { ICar } from '../types/types';
import { getJson, postJson } from './fetch';
import { getRandomCar, getRandomName } from './garage';

//const baseApiUrl2 = 'https://rss-async-race-api.herokuapp.com';
const baseApiUrl = 'http://127.0.0.1:3000';


export const model = {

  getCars: async () => {
    const url = baseApiUrl + '/garage';
    const data: ICar[] = await getJson(url, 'GET');
    return data;
  },

  deleteCar: async (id: number) => {
    const url = baseApiUrl + `/garage/${id}`;
    const data: string = await getJson(url, 'DELETE');
    return data;
  },

  createCar: async (car: ICar) => {
    const url = baseApiUrl + '/garage';
    const data = await postJson(url, 'POST', car);
    return data;
  },

  updateCar: async (car: ICar) => {
    const url = baseApiUrl + `/garage/${car.id}`;
    const data = await postJson(url, 'PUT', car);
    return data;
  },

  generateCars: async (count: number) => {

    const requests = Array(count).fill(0).map(el=>{
      return {
        color: getRandomCar(),
        name: getRandomName(),
        id: 0,
      };
    });

    for (const i of requests) {
      await model.createCar(i);
    }
  },

  


};

