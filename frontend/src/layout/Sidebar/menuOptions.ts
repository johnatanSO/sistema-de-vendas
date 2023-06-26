import {
  faPieChart,
  faDollarSign,
  faClipboardList,
  faUsers,
  faBox,
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
    title: 'Clientes',
    link: '/clientes',
    icon: faUsers,
    name: 'clientes',
  },
  {
    title: 'Produtos',
    link: '/produtos',
    icon: faBox,
    name: 'produtos',
  },
]
