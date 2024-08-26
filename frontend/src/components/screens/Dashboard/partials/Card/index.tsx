import style from './Card.module.scss'
import { useRouter } from 'next/router'
import { CSSProperties, ReactNode } from 'react'

type Props = {
  title: string
  value: string | number
  icon: ReactNode
  route: string | null
  className: string
  query?: unknown
  customStyle?: CSSProperties
}

export function Card({
  title,
  value,
  icon,
  route,
  className,
  query,
  customStyle,
}: Props) {
  const router = useRouter()

  function handleClickCard(routeParams: { pathname: string; query?: any }) {
    if (route) router.push(routeParams)
  }

  return (
    <li
      className={`${style.card} ${style[className]}`}
      onClick={() => {
        handleClickCard({
          pathname: `/${route}`,
          ...(query ? { query } : {}),
        })
      }}
      style={customStyle ?? customStyle}
    >
      <header>
        <h4>{title}</h4>

        {icon && icon}
      </header>

      <span>{value || 0}</span>
    </li>
  )
}
