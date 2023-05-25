'use client'
import { useRouter, usePathname } from 'next/navigation'
import style from './Sidebar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { menuOptions } from './menuOptions'

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <aside className={style.sidebarContainer}>
      <div className={style.userButton}>
        <FontAwesomeIcon className={style.userIcon} icon={faUser} />
        <span className={style.notification}>2</span>
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
                pathname === option.link ? style.activeMenu : undefined
              }
            >
              <FontAwesomeIcon icon={option.icon} />
            </li>
          )
        })}
      </ul>
      <FontAwesomeIcon
        className={style.logoutButton}
        title="Sair"
        icon={faRightFromBracket}
      />
    </aside>
  )
}
