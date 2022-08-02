import { IWinner, IwinnersFull } from '../types/types';
import { model } from './fetchData';

export async function getFullWinnerData(winners: IWinner[]) {
  const data = [];
  for (const w of winners) {
    const car = await model.getCar(w.id);
    data.push(Object.assign(w, car));
  }
    

  return data;
}