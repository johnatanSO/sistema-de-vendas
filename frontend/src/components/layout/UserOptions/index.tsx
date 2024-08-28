import { Popover } from '@mui/material'
import style from './UserOptions.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faEnvelope,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { IPosition } from './interfaces/IPosition'
import { useUserOptions } from './hooks/useUserOptions'

export interface UserInfo {
  name: string
  email: string
  password: string
}

type Props = {
  position: IPosition
}

export function UserOptions({ position }: Props) {
  const {
    getPosition,
    handleLogout,
    setUserInfoAnchorEl,
    userInfo,
    userInfoAnchorEl,
  } = useUserOptions({ position })

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
