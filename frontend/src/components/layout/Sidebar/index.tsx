import { useRouter } from 'next/router'
import style from './Sidebar.module.scss'
import { menuOptions } from '../../../utils/menuOptions'
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
        {menuOptions.map(({ disabled, icon, ...option }) => {
          return (
            <li
              style={disabled ? { opacity: '0.4', cursor: 'not-allowed' } : {}}
              className={
                router.pathname === option.link ? style.activeMenu : undefined
              }
              key={option.name}
            >
              <Link href={disabled ? '/404' : option.link} title={option.name}>
                {icon && icon}
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
