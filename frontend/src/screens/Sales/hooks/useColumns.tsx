import dayjs from 'dayjs'
import { Column, ValueFormatterParams } from '../../../../src/models/columns'
import { format } from '../../../../src/utils/format'
import { faBan, faPen } from '@fortawesome/free-solid-svg-icons'
import { ActionButtons } from '../../../../src/components/ActionButtons'
import { Sale } from '..'
import style from '../Sales.module.scss'

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
      cellClass: (params) => {
        if (params?.data?.status === 'canceled') {
          return style.canceledText
        }
      },
    },
    {
      headerName: 'Cliente',
      field: 'client',
      valueFormatter: (params: ValueFormatterParams) => params.value || '--',
      cellClass: (params) => {
        if (params?.data?.status === 'canceled') {
          return style.canceledText
        }
      },
    },
    {
      headerName: 'Data da venda',
      field: 'date',
      valueFormatter: (params: ValueFormatterParams) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
      cellClass: (params) => {
        if (params?.data?.status === 'canceled') {
          return style.canceledText
        }
      },
    },
    {
      headerName: 'Valor total',
      field: 'totalValue',
      valueFormatter: (params: ValueFormatterParams) =>
        format.formatarReal(params.value),
      cellClass: (params) => {
        if (params?.data?.status === 'canceled') {
          return style.canceledText
        }
      },
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