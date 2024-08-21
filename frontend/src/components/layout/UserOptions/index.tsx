import { Popover } from '@mui/material'
import style from './UserOptions.module.scss'
import { useContext, useState } from 'react'
import { usersService } from '../../../services/usersService'
import { useRouter } from 'next/router'
import { UserContext } from '../../../contexts/userContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faEnvelope,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

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
        <FontAwesomeIcon className={style.userIcon} icon={faUser} />
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
            <FontAwesomeIcon className={style.icon} icon={faUser} />
            {userInfo?.name || '--'}
          </p>
          <p>
            {' '}
            <FontAwesomeIcon className={style.icon} icon={faEnvelope} />
            {userInfo?.email || '--'}
          </p>
          <>
            <button
              type="button"
              className={style.logoutButton}
              onClick={handleLogout}
              title="Sair"
            >
              <FontAwesomeIcon className={style.icon} icon={faAngleLeft} />
              Sair
            </button>
          </>
        </div>
      </Popover>
    </>
  )
}
