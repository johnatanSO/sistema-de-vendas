import { createContext, ReactNode, useEffect, useState } from 'react'
import { usersService } from '../services/usersService'
import { IUser } from '../models/interfaces/IUser'

interface Props {
  children: ReactNode
}

interface IUserContext {
  userInfo: IUser | null
}

export const UserContext = createContext({} as IUserContext)

export function UserContextComponent({ children }: Props) {
  const [userInfo, setUserInfo] = useState<IUser | null>(null)

  useEffect(() => {
    const userStorage = usersService.getUserInfo()

    if (userStorage) {
      setUserInfo(userStorage)
    }
  }, [])

  return (
    <UserContext.Provider value={{ userInfo }}>{children}</UserContext.Provider>
  )
}
