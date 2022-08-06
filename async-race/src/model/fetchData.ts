import { ICar, ICarSpeed, IWinner, TEngineStatus, TSortDir, TSortOptions } from '../types/types';
import { getJson, getJsonWithTotal, postJson } from './fetch';
import { getRandomCar, getRandomName } from './garage';

//const baseApiUrl2 = 'https://rss-async-race-api.herokuapp.com';
const baseApiUrl = 'http://127.0.0.1:3000';


export const model = {
  getCar: async (id: number) =>{
    const url = `${baseApiUrl}/garage/${id}`;
    const data: ICar = await getJson(url, 'GET');
    return data;
  },

  getCars: async (page?: number, limit?: number ) => {
    const url = `${baseApiUrl}/garage${page ? `?_page=${page}` : ''}${limit ? `&_limit=${limit}` : ''}`;
    const data = await getJsonWithTotal(url, 'GET');
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

    const cars = Array(count).fill(0).map(el=>{
      return {
        color: getRandomCar(),
        name: getRandomName(),
        id: 0,
      };
    });

    for (const c of cars) {
      await model.createCar(c);
    }
  },

  getWinners: async (page: number, limit: number, sort: TSortOptions, order: TSortDir = 'Asc') => {
    const url = baseApiUrl + 
    `/winners?_page=${page}&_limit=${limit}&_sort=${sort.toLowerCase()}&_order=${order.toLowerCase()}`;
    const data = await getJsonWithTotal(url, 'GET');
    return data;
  },

  start: async (id: number) => {
    return  model.engine(id, 'started');
  },

  stop: async (id: number) => {
    return  model.engine(id, 'stopped');
  },
  
  drive: async (id: number) => {
    return  model.engine(id, 'drive');
  },

  engine: async (id: number, action: TEngineStatus) => {
    const url = baseApiUrl + `/engine?id=${id}&status=${action}`;
    const data = await getJsonWithTotal(url, 'PATCH') as JsonData;
    return data;
  },


};

export type JsonData = {
  status: number;
  total: string | null;
  data: ICar[] | IWinner[] | ICarSpeed;
};