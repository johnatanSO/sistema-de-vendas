import { createContext, ReactNode, useEffect, useState } from 'react'
import { usersService } from '../services/usersService'

interface Props {
  children: ReactNode
}

interface UserInfo {
  _id: string
  name: string
  email: string
}
interface IUserContext {
  userInfo: UserInfo | null
}

export const UserContext = createContext({} as IUserContext)

export function UserContextComponent({ children }: Props) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

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
