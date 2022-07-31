import React, {createContext, useState} from 'react'

interface IModalContext {
  updateState: boolean
  updateNeeded: () => void
  updated: () => void
}

export const GarageContext = createContext<IModalContext>({
  updateState: false,
  updateNeeded: () => {},
  updated: () => {}
})

export const GarageState = ({ children }: {children: React.ReactNode}) => {
  const [updateState, setUpdateState] = useState(false)

  const updateNeeded = () => setUpdateState(false)

  const updated = () => setUpdateState(true)

  return (
    <GarageContext.Provider value={{ updateState, updateNeeded, updated }}>
      { children }
    </GarageContext.Provider>
  )
}