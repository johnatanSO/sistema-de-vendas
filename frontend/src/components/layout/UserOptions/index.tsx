import { Popover, Typography } from '@mui/material'
import style from './UserOptions.module.scss'
import { useEffect, useState } from 'react'
import { usersService } from '../../../services/usersService'
import { useRouter } from 'next/router'
import { CaretLeft, Envelope, User } from '@phosphor-icons/react'

export interface UserInfo {
  name: string
  email: string
  password: string
}

type Props = {
  position: {
    horizontal: 'left' | 'right'
    vertical: 'top' | 'bottom'
  }
}

export function UserOptions({ position }: Props) {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)
  const [userInfoAnchorEl, setUserInfoAnchorEl] = useState<any>(null)
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
  async function handleLogout() {
    await usersService.deleteToken()
    router.push('/login')
  }

  useEffect(() => {
    const userData = usersService.getUserInfo()
    setUserInfo(userData)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          setUserInfoAnchorEl(event?.currentTarget)
        }}
        className={style.userButton}
      >
        <User size={23} />
      </button>

      <Popover
        onClose={() => {
          setUserInfoAnchorEl(null)
        }}
        anchorEl={userInfoAnchorEl}
        open={!!userInfoAnchorEl}
        PaperProps={{
          sx: {
            borderRadius: '20px',
            backgroundColor: '#323238',
            color: '#c4c4cc',
            ...getPosition(),
          },
        }}
      >
        <Typography className={style.userInfoContainer}>
          <p>
            <User size={23} />
            {userInfo?.name || '--'}
          </p>
          <p>
            {' '}
            <Envelope size={23} />
            {userInfo?.email || '--'}
          </p>
          <p>
            <button
              type="button"
              className={style.logoutButton}
              onClick={handleLogout}
              title="Sair"
            >
              <CaretLeft size={21} />
              Sair
            </button>
          </p>
        </Typography>
      </Popover>
    </>
  )
}
