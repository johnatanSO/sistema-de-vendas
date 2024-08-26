import dayjs from 'dayjs'
import {
  IColumn,
  CellFunctionParams,
} from '../../../../models/interfaces/IColumn'
import { format } from '../../../../utils/format'
import { ISale } from '../../../../models/interfaces/ISale'
import style from '../Sales.module.scss'
import { faCancel, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface UseColumnsParams {
  handleCancelSale: (sale: ISale) => void
  handleEditSale: (sale: ISale) => void
}

export function useColumns({
  handleEditSale,
  handleCancelSale,
}: UseColumnsParams): IColumn[] {
  const actions = [
    {
      icon: <FontAwesomeIcon className={style.icon} icon={faPen} />,
      title: 'Editar venda',
      onClickFunction: handleEditSale,
      className: style.editButton,
    },
    {
      icon: <FontAwesomeIcon className={style.icon} icon={faCancel} />,
      title: 'Cancelar venda',
      onClickFunction: handleCancelSale,
      className: style.cancelButton,
    },
  ]

  return [
    {
      headerName: 'Nº da venda',
      field: 'code',
      valueFormatter: (params: CellFunctionParams<ISale>) => params.value,
      cellClass: ({ data: { status } }) => {
        if (status === 'canceled') return style.canceledText
      },
    },
    {
      headerName: 'Cliente',
      field: 'client',
      valueFormatter: ({ data: { client } }: CellFunctionParams<ISale>) =>
        client?.name || '--',
      cellClass: ({ data: { status } }) => {
        if (status === 'canceled') return style.canceledText
      },
    },
    {
      headerName: 'Data da venda',
      field: 'date',
      valueFormatter: (params: CellFunctionParams<ISale>) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
      cellClass: ({ data: { status } }) => {
        if (status === 'canceled') return style.canceledText
      },
    },
    {
      headerName: 'Forma de pagamento',
      field: 'paymentType',
      valueFormatter: (params: CellFunctionParams<ISale>) =>
        format.formatarFormaDePagamento(params.value),
      cellClass: ({ data: { status } }) => {
        if (status === 'canceled') return style.canceledText
      },
    },
    {
      headerName: 'Valor total',
      field: 'totalValue',
      valueFormatter: (params: CellFunctionParams<ISale>) =>
        format.formatarReal(params.value),
      cellClass: ({ data: { status } }) => {
        if (status === 'canceled') return style.canceledText
      },
    },
    {
      headerName: '',
      field: 'acoes',
      type: 'actions',
      cellRenderer: (params: CellFunctionParams<ISale>) => {
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
