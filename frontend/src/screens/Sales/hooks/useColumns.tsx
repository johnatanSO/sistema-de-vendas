import dayjs from 'dayjs'
import { Column, ValueFormatterParams } from '../../../../src/models/columns'
import { format } from '../../../../src/utils/format'
import { faBan, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ActionButtons } from '../../../../src/components/ActionButtons'
import { Sale } from '..'

interface UseColumnsParams {
  handleCancelSale: (sale: Sale) => void
  handleEditSale: (sale: Sale) => void
}

export function useColumns({
  handleEditSale,
  handleCancelSale,
}: UseColumnsParams): Column[] {
  const actions = [
    {
      icon: faPen,
      title: 'Editar venda',
      color: '#31a2ff',
      onClickFunction: handleEditSale,
    },
    {
      icon: faBan,
      title: 'Caneclar venda',
      color: '#ed4252',
      onClickFunction: handleCancelSale,
    },
  ]

  return [
    {
      headerName: 'Nº pedido',
      field: '_id',
      valueFormatter: (params: ValueFormatterParams) => params.value,
    },
    {
      headerName: 'Cliente',
      field: 'client',
      valueFormatter: (params: ValueFormatterParams) => params.value || '--',
    },
    {
      headerName: 'Data da venda',
      field: 'date',
      valueFormatter: (params: ValueFormatterParams) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      headerName: 'Valor total',
      field: 'totalValue',
      valueFormatter: (params: ValueFormatterParams) =>
        format.formatarReal(params.value),
    },
    {
      headerName: '',
      field: 'acoes',
      cellRenderer: (params: ValueFormatterParams) => {
        return <ActionButtons actions={actions} params={params} />
      },
    },
  ]
}
