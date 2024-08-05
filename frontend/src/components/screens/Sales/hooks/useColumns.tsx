import dayjs from 'dayjs'
import { Column, CellFunctionParams } from '../../../../models/columns'
import { format } from '../../../../utils/format'
import { Sale } from '..'
import style from '../Sales.module.scss'
import { Pen, Prohibit } from '@phosphor-icons/react'

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
      icon: <Pen size={32} />,
      title: 'Editar venda',
      onClickFunction: handleEditSale,
      className: style.editButton,
    },
    {
      icon: <Prohibit size={32} />,
      title: 'Caneclar venda',
      onClickFunction: handleCancelSale,
      className: style.cancelButton,
    },
  ]

  return [
    {
      headerName: 'Nº da venda',
      field: 'code',
      valueFormatter: (params: CellFunctionParams) => params.value,
      cellClass: (params) => {
        if (params?.data?.status === 'canceled') {
          return style.canceledText
        }
      },
    },
    {
      headerName: 'Cliente',
      field: 'client',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
      cellClass: (params) => {
        if (params?.data?.status === 'canceled') {
          return style.canceledText
        }
      },
    },
    {
      headerName: 'Data da venda',
      field: 'date',
      valueFormatter: (params: CellFunctionParams) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
      cellClass: (params) => {
        if (params?.data?.status === 'canceled') {
          return style.canceledText
        }
      },
    },
    {
      headerName: 'Forma de pagamento',
      field: 'paymentType',
      valueFormatter: (params: CellFunctionParams) =>
        format.formatarFormaDePagamento(params.value),
      cellClass: (params) => {
        if (params?.data?.status === 'canceled') {
          return style.canceledText
        }
      },
    },
    {
      headerName: 'Valor total',
      field: 'totalValue',
      valueFormatter: (params: CellFunctionParams) =>
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
      type: 'actions',
      cellRenderer: (params: CellFunctionParams) => {
        return (
          <div className={style.actionsContainer}>
            {actions.map(({ icon, ...action }) => {
              return (
                <button
                  className={action.className}
                  key={action.title}
                  type="button"
                  disabled={params?.data?.status === 'canceled'}
                  onClick={() => {
                    action?.onClickFunction?.(params.data)
                  }}
                >
                  {icon && icon}
                </button>
              )
            })}
          </div>
        )
      },
    },
  ]
}
