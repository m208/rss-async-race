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
  nav: {
    showGarage: boolean, 
    showWinners: boolean
  }
}

export type TSortDir = 'Asc' | 'Desc';
export type TSortOptions = 'Wins' | 'Time';

export type TEngineStatus = 'started' | 'stopped' | 'drive';

export type TRaceWinner = { id: number, name: string, time: number, wins: number, };
