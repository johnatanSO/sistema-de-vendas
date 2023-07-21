import { Column, CellFunctionParams } from '../../../../src/models/columns'
import { format } from '../../../../src/utils/format'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ActionButtons } from '../../../../src/components/ActionButtons'
import { Account } from '..'
import dayjs from 'dayjs'
import style from '../Accounts.module.scss'

interface UseColumnsParams {
  handleEditAccount: (account: Account) => void
  handleDeleteAccount: (account: Account) => void
}

export function useColumns({
  handleEditAccount,
  handleDeleteAccount,
}: UseColumnsParams): Column[] {
  const actions = [
    {
      icon: faPen,
      title: 'Editar',
      color: '#31a2ff',
      onClickFunction: handleEditAccount,
    },
    {
      icon: faTrash,
      title: 'Excluir',
      color: '#ed4252',
      onClickFunction: handleDeleteAccount,
    },
  ]

  return [
    {
      headerName: 'Tipo',
      field: 'type',
      valueFormatter: (params: CellFunctionParams) =>
        params.value === 'in' ? 'Entrada' : 'Saída' || '--',
      cellClass: (params) => {
        if (params?.data?.type === 'in') {
          return style.positiveText
        }
        return style.negativeText
      },
    },
    {
      headerName: 'Descrição',
      field: 'description',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'Categoria',
      field: 'category',
      valueFormatter: (params: CellFunctionParams) => params.value || 0,
    },
    {
      headerName: 'Data',
      field: 'date',
      valueFormatter: (params: CellFunctionParams) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      headerName: 'Valor',
      field: 'value',
      valueFormatter: (params: CellFunctionParams) =>
        format.formatarReal(params.value || 0),
      cellClass: (params) => {
        if (params?.data?.type === 'in') {
          return style.positiveText
        }
        return style.negativeText
      },
    },
    {
      headerName: '',
      field: 'acoes',
      cellRenderer: (params: CellFunctionParams) => {
        return <ActionButtons actions={actions} params={params} />
      },
    },
  ]
}
