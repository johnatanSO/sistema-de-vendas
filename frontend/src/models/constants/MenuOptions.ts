import {
  faBox,
  faCartPlus,
  faChartSimple,
  faFileInvoiceDollar,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { MenuOption } from '../interfaces/MenuOption'

export const menuOptions: MenuOption[] = [
  {
    title: 'Dashboard',
    link: '/',
    icon: faChartSimple,
    name: 'dashboard',
  },
  {
    title: 'Vendas',
    link: '/vendas',
    icon: faCartPlus,
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
    icon: faUsers,
    name: 'clientes',
  },
  {
    title: 'Contas',
    link: '/contas',
    icon: faFileInvoiceDollar,
    name: 'contas',
  },
]
