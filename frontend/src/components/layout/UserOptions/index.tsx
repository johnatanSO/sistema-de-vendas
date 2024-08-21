import { Popover } from '@mui/material'
import style from './UserOptions.module.scss'
import { useContext, useState } from 'react'
import { usersService } from '../../../services/usersService'
import { useRouter } from 'next/router'
import { CaretLeft, Envelope, User } from '@phosphor-icons/react'
import { UserContext } from '../../../contexts/userContext'

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
        <div className={style.userInfoContainer}>
          <p>
            <User size={23} />
            {userInfo?.name || '--'}
          </p>
          <p>
            {' '}
            <Envelope size={23} />
            {userInfo?.email || '--'}
          </p>
          <>
            <button
              type="button"
              className={style.logoutButton}
              onClick={handleLogout}
              title="Sair"
            >
              <CaretLeft size={21} />
              Sair
            </button>
          </>
        </div>
      </Popover>
    </>
  )
}
