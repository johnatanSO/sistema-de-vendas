import dayjs from 'dayjs'
import { format } from '../../../../utils/format'
import style from '../Sales.module.scss'

export function useFieldsMobile() {
  return [
    {
      field: 'date',
      cellClass: (params: any) => {
        if (params?.data?.status === 'canceled') {
          return style.canceledText
        }
        return ''
      },
      valueFormatter: (params: any) => {
        return dayjs(params?.value).format('DD/MM/YYYY HH:mm')
      },
    },
    {
      field: 'totalValue',
      cellClass: (params: any) => {
        if (params?.data?.status === 'canceled') {
          return style.canceledText
        }
        return ''
      },
      valueFormatter: (params: any) => {
        return format.formatarReal(params?.value || 0)
      },
    },
  ]
}
