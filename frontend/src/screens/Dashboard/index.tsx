import { dashboardService } from '../../services/dashboardService'
import { useEffect, useState } from 'react'
import { FilterDate } from '../../../src/components/FilterDate'
import style from './Dashboard.module.scss'
import { format } from '../../utils/format'
import {
  XAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  YAxis,
  LabelList,
} from 'recharts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDown,
  faAngleUp,
  faBagShopping,
  faCancel,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons'
import { CustomLabel } from './tools/CustomLabel'
import { CustomTooltip } from './tools/CustomToolTip'
import { accountsService } from '../../services/accountsService'
import { useRouter } from 'next/router'
import { salesService } from '../../services/salesService'
import dayjs from 'dayjs'

interface PaymentType {
  type: string
  value: number
}

interface Account {
  type: string
  value: number
}

interface Sale {
  status: string
  totalValue: number
}

export function Dashboard() {
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])
  const [sales, setSales] = useState<Sale[]>([])
  const router = useRouter()

  const datesFilter = {
    startDate: router.query.startDate
      ? router.query.startDate
      : dayjs().startOf('month').toISOString(),
    endDate: router.query.endDate
      ? router.query.endDate
      : dayjs().endOf('month').toISOString(),
  }

  function getPaymentTypes() {
    dashboardService
      .getPaymentTypes({ filters: { ...datesFilter } })
      .then((res) => {
        const formatedPayments = res.data.items?.map((payment: any) => {
          return {
            label: format.formatarFormaDePagamento(payment.type),
            formatedData: format.formatarReal(payment.value || 0),
            Valor: payment.value || 0,
          }
        })
        setPaymentTypes(formatedPayments)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR FORMAS DE PAGAMENTO, ', err)
      })
      .finally(() => {})
  }

  function getAccounts() {
    accountsService
      .getAll({ filters: { ...datesFilter } })
      .then((res) => {
        setAccounts(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR CONTAS,', err)
      })
  }

  function getSales() {
    salesService
      .getAll({ filters: { ...datesFilter } })
      .then((res) => {
        setSales(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR VENDAS, ', err)
      })
  }

  useEffect(() => {
    Promise.all([getPaymentTypes(), getAccounts(), getSales()])
  }, [router.query])

  const totalAccounts = accounts.reduce(
    (acc, account) => {
      if (account.type === 'in') acc.inTotalValue += account.value
      if (account.type === 'out') acc.outTotalValue += account.value
      acc.totalValueAccounts = account.value
      return acc
    },
    {
      inTotalValue: 0,
      outTotalValue: 0,
      totalValueAccounts: 0,
    },
  )

  const totalSales = sales.reduce(
    (acc, sale) => {
      if (sale.status === 'canceled') acc.totalValueCanceled += sale.totalValue
      acc.totalValueSales = sale.totalValue
      return acc
    },
    {
      totalValueSales: 0,
      totalValueCanceled: 0,
    },
  )

  function handleClickCard(routeParams: { pathname: string; query?: any }) {
    router.push(routeParams)
  }

  return (
    <>
      <header className={style.headerPage}>
        <FilterDate />
      </header>

      <ul className={style.salesCardsContainer}>
        <li
          className={`${style.card} ${style.amountCard}`}
          onClick={() => {
            handleClickCard({
              pathname: '/sales/',
            })
          }}
        >
          <header>
            <h4>Quantidade de vendas</h4>
            <FontAwesomeIcon className={style.icon} icon={faBagShopping} />
          </header>
          <span>{sales?.length || 0}</span>
        </li>
        <li
          className={`${style.card} ${style.valueCard}`}
          onClick={() => {
            handleClickCard({
              pathname: '/sales/',
            })
          }}
        >
          <header>
            <h4>Valor de vendas</h4>
            <FontAwesomeIcon className={style.icon} icon={faDollarSign} />
          </header>
          <span>{format.formatarReal(totalSales.totalValueSales || 0)}</span>
        </li>
        <li
          className={`${style.card} ${style.valueCanceledCard}`}
          onClick={() => {
            handleClickCard({
              pathname: '/sales/',
              query: {
                status: 'canceled',
              },
            })
          }}
        >
          <header>
            <h4>Vendas canceladas</h4>
            <FontAwesomeIcon className={style.icon} icon={faCancel} />
          </header>
          <span>{format.formatarReal(totalSales.totalValueCanceled || 0)}</span>
        </li>
      </ul>

      <div className={style.graphsContainer}>
        <div className={style.graph}>
          <header>
            <h4>Tipos de pagamento</h4>
          </header>
          <main>
            {paymentTypes.length > 0 && (
              <div
                style={{
                  height: '580px',
                  width: '100%',
                  margin: '0 auto',
                }}
              >
                <ResponsiveContainer>
                  <BarChart
                    margin={{ top: 40, right: 0, bottom: 0, left: 0 }}
                    data={paymentTypes}
                  >
                    <Tooltip
                      content={
                        <CustomTooltip usarLabel={true} formatarReal={true} />
                      }
                    />
                    <XAxis
                      tick={{ fill: '#c4c4cc', fontWeight: '600' }}
                      dataKey="label"
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar radius={[10, 10, 0, 0]} dataKey="Valor" fill="#ff6600">
                      <LabelList
                        position="top"
                        content={
                          <CustomLabel
                            usarLabel={true}
                            formatarReal={true}
                            position="top"
                            fill="#FFF"
                          />
                        }
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </main>
        </div>

        <div className={style.sideRightContainer}>
          <ul className={style.accountsCardsContainer}>
            <li
              className={`${style.card} ${style.inCard}`}
              onClick={() => {
                handleClickCard({
                  pathname: '/accounts/',
                  query: {
                    accountType: 'in',
                  },
                })
              }}
            >
              <header>
                <h4>Entradas</h4>
                <FontAwesomeIcon className={style.icon} icon={faAngleUp} />
              </header>
              <span>
                {format.formatarReal(totalAccounts.inTotalValue || 0)}
              </span>
            </li>
            <li
              className={`${style.card} ${style.outCard}`}
              onClick={() => {
                handleClickCard({
                  pathname: '/accounts/',
                  query: {
                    accountType: 'out',
                  },
                })
              }}
            >
              <header>
                <h4>Saídas</h4>
                <FontAwesomeIcon className={style.icon} icon={faAngleDown} />
              </header>
              <span>
                {format.formatarReal(totalAccounts.outTotalValue || 0)}
              </span>
            </li>
            <li
              className={`${style.card} ${style.totalCard}`}
              onClick={() => {
                handleClickCard({
                  pathname: '/accounts/',
                })
              }}
            >
              <header>
                <h4>Total</h4>
                <FontAwesomeIcon className={style.icon} icon={faDollarSign} />
              </header>
              <span>
                {format.formatarReal(totalAccounts.totalValueAccounts || 0)}
              </span>
            </li>
          </ul>

          <div className={style.pizzaGraph}>gráfico de pizza de produtos</div>
        </div>
      </div>
    </>
  )
}
