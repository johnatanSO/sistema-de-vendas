import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './MenuMobile.module.scss'
import { menuOptions } from '../Sidebar/menuOptions'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserOptions } from '../UserOptions'

export function MenuMobile() {
  const router = useRouter()
  return (
    <footer className={style.footerMenu}>
      <nav>
        <ul>
          {menuOptions.map(({ disabled, ...option }) => {
            return (
              <li
                style={
                  disabled ? { opacity: '0.4', cursor: 'not-allowed' } : {}
                }
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

          <UserOptions
            position={{
              horizontal: 'left',
              vertical: 'top',
            }}
          />
        </ul>
      </nav>
    </footer>
  )
}
