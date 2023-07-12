import { useRouter } from 'next/router'
import style from './Sidebar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { menuOptions } from './menuOptions'
import { usersService } from '../../../src/services/usersService'

export function Sidebar() {
  const router = useRouter()

  async function handleLogout() {
    await usersService.deleteToken()
    router.push('/login')
  }

  return (
    <aside className={style.sidebarContainer}>
      <div className={style.userButton}>
        <FontAwesomeIcon className={style.userIcon} icon={faUser} />
        <div className={style.notification}>2</div>
      </div>

      <ul className={style.menuList}>
        {menuOptions.map((option) => {
          return (
            <li
              key={option.name}
              onClick={() => {
                router.push(option.link)
              }}
              title="Dashboard"
              className={
                router.pathname === option.link ? style.activeMenu : undefined
              }
            >
              <FontAwesomeIcon className={style.icon} icon={option.icon} />
            </li>
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
