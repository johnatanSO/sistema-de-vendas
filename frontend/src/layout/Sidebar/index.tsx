import { useRouter } from 'next/router'
import style from './Sidebar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { menuOptions } from './menuOptions'
import Link from 'next/link'
import { UserOptions } from '../UserOptions'

export function Sidebar() {
  const router = useRouter()

  return (
    <aside className={style.sidebarContainer}>
      <UserOptions
        position={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      />

      <ul className={style.menuList}>
        {menuOptions.map(({ disabled, ...option }) => {
          return (
            <li
              style={disabled ? { opacity: '0.4', cursor: 'not-allowed' } : {}}
              className={
                router.pathname === option.link ? style.activeMenu : undefined
              }
              key={option.name}
            >
              <Link href={disabled ? '#' : option.link} title="Dashboard">
                <FontAwesomeIcon className={style.icon} icon={option.icon} />
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
