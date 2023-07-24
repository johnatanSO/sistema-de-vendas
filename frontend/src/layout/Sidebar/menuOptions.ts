import {
  faPieChart,
  faDollarSign,
  faBox,
  faClipboardUser,
  faFileInvoiceDollar,
} from '@fortawesome/free-solid-svg-icons'

interface MenuOption {
  title: string
  link: string
  icon: any
  name: string
  disabled?: boolean
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
    title: 'Produtos',
    link: '/produtos',
    icon: faBox,
    name: 'produtos',
  },
  {
    title: 'Clientes',
    link: '/clientes',
    icon: faClipboardUser,
    name: 'clientes',
    disabled: true,
  },
  {
    title: 'Contas',
    link: '/contas',
    icon: faFileInvoiceDollar,
    name: 'contas',
  },
]
