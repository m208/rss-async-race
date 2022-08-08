import { ICarState } from '../model/Car';

export interface ICar {
  id: number
  name: string
  color: string
}

export interface IWinner {
  id: number
  wins: number
  time: number
}

export interface ICarSpeed {
  velocity: number
  distance: number
}

export type IwinnersFull = Omit<ICar, 'id'> & IWinner;

export interface IPaginationContext {
  currentPage: number
  lastPage: number
  setPage: (num: number) => void
  setPageCount: (num: number) => void

  onChange: ()=>void
}

export interface ISortContext {
  sortBy: TSortOptions,
  setSortBy: (val: TSortOptions)=>void, 
  activeSorter: TSortDir,
  setActiveSorter: (dir: TSortDir)=>void, 
  timeSorter: TSortDir,
  setTimeSorter: (dir: TSortDir)=>void, 
  winSorter: TSortDir, 
  setWinSorter: (dir: TSortDir)=>void 
  onChange: ()=>void
}

export interface IAppState {
  garagePagState: IPaginationContext
  winnersPagState: IPaginationContext
  winnersSort: ISortContext  

  nav: {
    showGarage: boolean, showWinners: boolean
  }
//  animationCount: IAnimState  // ?
//  carState: TCarst  // ?
}

type TCarst = {
  carState: ICarState[], setCarState: (value: React.SetStateAction<ICarState[]>) => void
};

export interface IAnimState {
  counter: number
  setCounter: (value: React.SetStateAction<number>) => void
  startAnim: (dur:number)=>void
  shouldAnimate: boolean,
  setShouldAnimate: (value: React.SetStateAction<boolean>) => void,
}

export type TSortDir = 'Asc' | 'Desc';
export type TSortOptions = 'Wins' | 'Time';

export type TEngineStatus = 'started' | 'stopped' | 'drive';

export type TRaceWinner = { id: number, name: string, time: number, wins: number, };
export type TWinner = { id: number, wins: number, time: number };