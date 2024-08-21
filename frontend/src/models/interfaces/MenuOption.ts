import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export interface MenuOption {
  title: string
  link: string
  icon: IconDefinition
  name: string
  disabled?: boolean
}
