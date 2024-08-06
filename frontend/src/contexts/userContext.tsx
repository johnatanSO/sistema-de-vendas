import { createContext, ReactNode } from 'react'

interface UserContextComponentProps {
  children: ReactNode
}

export const UserContext = createContext({} as any)

export function UserContextComponent({ children }: UserContextComponentProps) {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>
}
