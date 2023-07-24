import { useRouter } from 'next/router'
import style from './Sidebar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { menuOptions } from './menuOptions'
import { usersService } from '../../../src/services/usersService'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export interface UserInfo {
  name: string
  email: string
  password: string
}

export function Sidebar() {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)
  const [userInfoCardOpened, setUserInfoCardOpened] = useState<boolean>(false)
  const router = useRouter()

  async function handleLogout() {
    await usersService.deleteToken()
    router.push('/login')
  }

  useEffect(() => {
    const userData = usersService.getUserInfo()
    setUserInfo(userData)
  }, [])

  function handleOpenUserInfoCard() {
    setUserInfoCardOpened(!userInfoCardOpened)
  }

  return (
    <aside className={style.sidebarContainer}>
      <div onClick={handleOpenUserInfoCard} className={style.userButton}>
        <FontAwesomeIcon className={style.userIcon} icon={faUser} />
        <div className={style.notification}>2</div>

        {userInfoCardOpened && (
          <div className={style.userInfoContainer}>
            <span>
              <FontAwesomeIcon className={style.icon} icon={faUser} />
              {userInfo?.name || '--'}
            </span>
            <span>
              {' '}
              <FontAwesomeIcon className={style.icon} icon={faEnvelope} />
              {userInfo?.email || '--'}
            </span>
          </div>
        )}
      </div>

      <ul className={style.menuList}>
        {menuOptions.map(({ disabled, ...option }) => {
          return (
            <Link href={option.link} key={option.name} title="Dashboard">
              <li
                style={
                  disabled
                    ? {
                        opacity: 0.4,
                        cursor: 'not-allowed',
                        pointerEvents: 'none',
                      }
                    : {}
                }
                className={
                  router.pathname === option.link ? style.activeMenu : undefined
                }
                title={option?.title}
              >
                <FontAwesomeIcon className={style.icon} icon={option.icon} />
              </li>
            </Link>
          )
        })}
      </ul>

      <FontAwesomeIcon
        className={style.logoutButton}
        title="Sair"
        icon={faRightFromBracket}
        onClick={handleLogout}
      />
    </aside>
  )
}
