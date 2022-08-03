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
}

export type TSortDir = 'Asc' | 'Desc';
export type TSortOptions = 'Wins' | 'Time';