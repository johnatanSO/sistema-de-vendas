import { useRouter } from 'next/router'
import style from './Sidebar.module.scss'
import { menuOptions } from '../../../models/constants/MenuOptions'
import Link from 'next/link'
import { UserOptions } from '../UserOptions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        {menuOptions.map(({ disabled, icon, title, ...option }) => {
          return (
            <Link
              key={option.name}
              href={disabled ? '/404' : option.link}
              title={option.name}
            >
              <li
                style={
                  disabled ? { opacity: '0.4', cursor: 'not-allowed' } : {}
                }
                className={
                  router.pathname === option.link ? style.activeMenu : undefined
                }
              >
                <>
                  {icon && (
                    <FontAwesomeIcon className={style.icon} icon={icon} />
                  )}
                  <span>{title}</span>
                </>
              </li>
            </Link>
          )
        })}
      </ul>
    </aside>
  )
}
