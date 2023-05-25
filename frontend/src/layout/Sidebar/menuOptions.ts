import {
  faPieChart,
  faDollarSign,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons'

interface MenuOption {
  title: string
  link: string
  icon: any
  name: string
}

export const menuOptions: MenuOption[] = [
  {
    title: 'Dashboard',
    link: '/',
    icon: faPieChart,
    name: 'dashboard',
  },
  {
    title: 'Vendas',
    link: '/vendas',
    icon: faDollarSign,
    name: 'vendas',
  },
  {
    title: 'Relatórios',
    link: '/relatorios',
    icon: faClipboardList,
    name: 'relatorios',
  },
]
