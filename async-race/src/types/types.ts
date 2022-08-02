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

  callback: ()=>void
}