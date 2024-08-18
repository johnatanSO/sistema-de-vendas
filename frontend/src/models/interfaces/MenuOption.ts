import { ElementType } from 'react'

export interface MenuOption {
  title: string
  link: string
  icon: ElementType
  name: string
  disabled?: boolean
}
