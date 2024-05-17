import { useRouter } from 'next/router'
import { menuOptions } from '../../../utils/menuOptions'
import style from './MenuOptionsMobile.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  handleOpenMenuOptions: () => void
}

export function MenuOptionsMobile({ handleOpenMenuOptions }: Props) {
  const router = useRouter()

  function handleSelectOption(option: any) {
    router.push(option.link)
    handleOpenMenuOptions()
  }

  return (
    <div className={style.menuOptionsContainer}>
      <nav>
        <ul className={style.listMenuOptions}>
          {menuOptions.map(({ disabled, ...option }) => {
            return (
              <li key={option.name}>
                <button
                  title={option.title}
                  onClick={() => {
                    handleSelectOption(option)
                  }}
                  style={
                    disabled ? { opacity: '0.4', cursor: 'not-allowed' } : {}
                  }
                  className={
                    router.pathname === option.link
                      ? style.activeMenu
                      : undefined
                  }
                >
                  <FontAwesomeIcon className={style.icon} icon={option.icon} />
                  <span>{option.title}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
