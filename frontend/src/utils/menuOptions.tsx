import {
  ChartBar,
  Invoice,
  Package,
  Tag,
  UsersThree,
} from '@phosphor-icons/react'
import { ReactElement } from 'react'

interface MenuOption {
  title: string
  link: string
  icon: ReactElement
  name: string
  disabled?: boolean
}

export const menuOptions: MenuOption[] = [
  {
    title: 'Dashboard',
    link: '/',
    icon: <ChartBar size={23} />,
    name: 'dashboard',
  },
  {
    title: 'Vendas',
    link: '/vendas',
    icon: <Tag size={23} />,
    name: 'vendas',
  },
  {
    title: 'Produtos',
    link: '/produtos',
    icon: <Package size={23} />,
    name: 'produtos',
  },
  {
    title: 'Clientes',
    link: '/clientes',
    icon: <UsersThree size={23} />,
    name: 'clientes',
  },
  {
    title: 'Contas',
    link: '/contas',
    icon: <Invoice size={23} />,
    name: 'contas',
  },
]
