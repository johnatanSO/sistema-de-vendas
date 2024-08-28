import {
  faBox,
  faCartPlus,
  faChartSimple,
  faFileInvoiceDollar,
  faTruckField,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { IMenuOption } from '../interfaces/IMenuOption'

export const menuOptions: IMenuOption[] = [
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
  {
    title: 'Fornecedores',
    link: '/fornecedores',
    icon: faTruckField,
    name: 'fornecedores',
  },
]
