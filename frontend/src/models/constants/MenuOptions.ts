import {
  ChartBar,
  Invoice,
  Package,
  Tag,
  UsersThree,
} from '@phosphor-icons/react'
import { MenuOption } from '../interfaces/MenuOption'

export const menuOptions: MenuOption[] = [
  {
    title: 'Dashboard',
    link: '/',
    icon: ChartBar,
    name: 'dashboard',
  },
  {
    title: 'Vendas',
    link: '/vendas',
    icon: Tag,
    name: 'vendas',
  },
  {
    title: 'Produtos',
    link: '/produtos',
    icon: Package,
    name: 'produtos',
  },
  {
    title: 'Clientes',
    link: '/clientes',
    icon: UsersThree,
    name: 'clientes',
  },
  {
    title: 'Contas',
    link: '/contas',
    icon: Invoice,
    name: 'contas',
  },
]
