import { ICar, ICarSpeed, IWinner, TEngineStatus, TRaceWinner, TSortDir, TSortOptions } from '../types/types';
import { baseApiUrl } from './configVars';
import { getJson, getJsonWithTotal, postJson } from './fetch';
import { getRandomCar, getRandomName } from './garage';

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

    try {
      await model.deleteWinner(id);
    } catch (e) {
      console.log('Deleted car does not belong to winners' );
    }
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

  getWinners: async (page: number, limit: number, sort: TSortOptions, order: TSortDir = 'Asc') => {
    const url = baseApiUrl + 
    `/winners?_page=${page}&_limit=${limit}&_sort=${sort.toLowerCase()}&_order=${order.toLowerCase()}`;
    const data = await getJsonWithTotal(url, 'GET');
    return data;
  },

  createWinner: async (winner: TRaceWinner) => {
    const url = baseApiUrl + '/winners';
    const data = await postJson(url, 'POST', winner);
    return data;
  },

  updateWinner: async (winner: TRaceWinner) => { 
    const url = baseApiUrl + `/winners/${winner.id}`;
    const data = await postJson(url, 'PUT', winner);
    return data;
  },

  getWinner: async (id: number) => {
    const url = baseApiUrl + `/winners/${id}`;
    const data: TRaceWinner = await getJson(url, 'GET');
    return data;
  },

  deleteWinner: async (id: number) => {
    const url = baseApiUrl + `/winners/${id}`;
    const data: string = await getJson(url, 'DELETE');
    return data;
  },

};

export async function manageWinnersDB(winner: TRaceWinner) {
  try {
    const existed = await model.getWinner(winner.id);
    existed.wins += 1;
    if (existed.time > winner.time) existed.time = winner.time;

    await model.updateWinner(existed);

  } catch (e) {

    await model.createWinner(winner);
  }
}

export type JsonData = {
  status: number;
  total: string | null;
  data: ICar[] | IWinner[] | ICarSpeed;
};