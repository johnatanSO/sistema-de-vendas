import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { UserContext } from '../../../../contexts/userContext'
import { IPosition } from '../interfaces/IPosition'
import { usersService } from '../../../../services/usersService'

type Props = {
  position: IPosition
}

export function useUserOptions({ position }: Props) {
  const { userInfo } = useContext(UserContext)
  const [userInfoAnchorEl, setUserInfoAnchorEl] = useState<HTMLElement | null>(
    null,
  )
  const router = useRouter()

  function getPosition() {
    const positionFormated: any = {}

    if (position?.horizontal === 'right') {
      positionFormated.marginLeft = '40px'
    }
    if (position?.horizontal === 'left') {
      positionFormated.marginRight = '40px'
    }
    if (position.vertical === 'top') {
      positionFormated.marginTop = '-25px'
    }
    if (position.vertical === 'bottom') {
      positionFormated.marginTop = '-15px'
    }

    return positionFormated
  }

  function handleLogout() {
    usersService.deleteToken()
    router.push('/login')
  }

  return {
    userInfoAnchorEl,
    setUserInfoAnchorEl,
    handleLogout,
    getPosition,
    userInfo,
  }
}
