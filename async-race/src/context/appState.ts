import { IPaginationContext } from '../types/types';

export function createPagState(
  currPage: [number, React.Dispatch<React.SetStateAction<number>>], 
  lastPage: [number, React.Dispatch<React.SetStateAction<number>>], 
) {
  const pagState: IPaginationContext = {
    currentPage: currPage[0], 
    lastPage: lastPage[0],  
    setPage: currPage[1],  
    setPageCount: lastPage[1],
    onChange: ()=>{},
  };

  return pagState;
}