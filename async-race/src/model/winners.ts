import { IWinner, IwinnersFull } from '../types/types';
import { model } from './fetchData';

export async function getFullWinnerData(winners: IWinner[]) {
  const data = [];
  for (const w of winners) {
    try {
      const car = await model.getCar(w.id);
      data.push(Object.assign(w, car));
    } catch (e) {
      console.log(`Car with id ${w.id} does not exist`);
    }

  }
    

  return data;
}