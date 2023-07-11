import { Column, ValueFormatterParams } from '../../../../src/models/columns'
import { format } from '../../../../src/utils/format'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ActionButtons } from '../../../../src/components/ActionButtons'

export function useColumns(): Column[] {
  const actions = [
    {
      icon: faPen,
      title: 'Editar',
      color: '#31a2ff',
      onClickFunction: () => {},
    },
    {
      icon: faTrash,
      title: 'Excluir',
      color: '#ed4252',
      onClickFunction: () => {},
    },
  ]

  return [
    {
      headerName: 'Código',
      field: '_id',
      valueFormatter: (params: ValueFormatterParams) => params.value || '--',
    },
    {
      headerName: 'Nome do produto',
      field: 'name',
      valueFormatter: (params: ValueFormatterParams) => params.value || '--',
    },
    {
      headerName: 'Quantidade',
      field: 'stock',
      valueFormatter: (params: ValueFormatterParams) => {
        console.log(params)
        return params.value || '--'
      },
    },
    {
      headerName: 'Valor',
      field: 'value',
      valueFormatter: (params: ValueFormatterParams) =>
        format.formatarReal(params.value || 0),
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
