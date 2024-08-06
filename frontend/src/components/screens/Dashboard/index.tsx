import { dashboardService } from '../../../services/dashboardService'
import { useEffect, useState } from 'react'
import { FilterDate } from '../../_ui/FilterDate'
import style from './Dashboard.module.scss'
import { format } from '../../../utils/format'
import {
  XAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  YAxis,
  LabelList,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { CustomLabel } from './tools/CustomLabel'
import { CustomTooltip } from './tools/CustomToolTip'
import { accountsService } from '../../../services/accountsService'
import { useRouter } from 'next/router'
import { salesService } from '../../../services/salesService'
import dayjs from 'dayjs'
import {
  CaretDown,
  CaretUp,
  CurrencyDollar,
  Prohibit,
  Tag,
} from '@phosphor-icons/react'
import { IPaymentType } from './interfaces/IPaymentType'
import { IAccount } from './interfaces/IAccount'
import { ISale } from './interfaces/ISale'
import { IProduct } from './interfaces/IProduct'
import { Card } from './partials/Card'

export function Dashboard() {
  const [paymentTypes, setPaymentTypes] = useState<IPaymentType[]>([])
  const [accounts, setAccounts] = useState<IAccount[]>([])
  const [sales, setSales] = useState<ISale[]>([])
  const [products, setProducts] = useState<IProduct[]>([])
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
        console.error(err)
      })
  }

  function getSales() {
    salesService
      .getAll({ filters: { ...datesFilter } as any })
      .then((res) => {
        setSales(res.data.items)
        getProducts(res.data.items)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function getProducts(sales: ISale[]) {
    const products = sales.reduce((acc: any, sale) => {
      sale.products.forEach((product) => {
        const productAlreadyExist = !!acc.find(
          (accProduct: any) => accProduct._id === product._id,
        )
        if (!productAlreadyExist) {
          acc.push({
            ...product,
          })
        } else {
          acc.forEach((accProduct: any) => {
            if (accProduct._id === product._id) {
              accProduct.amount += product.amount
              accProduct.value += product.value
            }
          })
        }
      })

      return acc
    }, [])
    setProducts(products)
  }

  useEffect(() => {
    getPaymentTypes()
    getAccounts()
    getSales()
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
      acc.totalValueSales += sale.totalValue
      return acc
    },
    {
      totalValueSales: 0,
      totalValueCanceled: 0,
    },
  )

  const graphPizzaData = [
    {
      title: 'Vendas por produto',
      colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
      values: products.map((product) => {
        return {
          name: product?.name || '',
          value: product?.value,
          amount: product?.amount,
        }
      }),
    },
  ]

  return (
    <>
      <header className={style.headerPage}>
        <FilterDate />
      </header>

      <ul className={style.salesCardsContainer}>
        <Card
          title="Quantidade de vendas"
          value={sales?.length || 0}
          icon={<Tag size={21} />}
          route="vendas"
          className="amountCard"
        />

        <Card
          title="Valor de vendas"
          value={format.formatarReal(totalSales?.totalValueSales || 0)}
          icon={<CurrencyDollar size={32} />}
          route="vendas"
          className="valueCard"
        />

        <Card
          title="Vendas canceladas"
          value={format.formatarReal(totalSales.totalValueCanceled || 0)}
          icon={<Prohibit size={32} />}
          route="vendas"
          query={{ status: 'canceled' }}
          className="valueCanceledCard"
        />
      </ul>

      <div className={style.graphsContainer}>
        <div className={style.graph}>
          <header>
            <h4>Tipos de pagamento</h4>
          </header>

          <main>
            {paymentTypes?.length > 0 ? (
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
            ) : (
              <div
                style={{
                  height: '580px',
                  width: '100%',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <h5>Nenhuma venda encontrada</h5>
              </div>
            )}
          </main>
        </div>

        <div className={style.sideRightContainer}>
          <ul className={style.accountsCardsContainer}>
            <Card
              title="Contas de entrada"
              className="inCard"
              icon={<CaretUp size={32} />}
              value={format.formatarReal(totalAccounts.inTotalValue || 0)}
              route="contas"
              query={{
                accountType: 'in',
              }}
            />

            <Card
              title="Contas de saída"
              className="outCard"
              icon={<CaretDown size={32} />}
              value={format.formatarReal(totalAccounts.outTotalValue || 0)}
              route="contas"
              query={{
                accountType: 'out',
              }}
            />

            <Card
              title="Total"
              className="totalCard"
              icon={<CurrencyDollar size={32} />}
              value={format.formatarReal(totalAccounts.totalValueAccounts || 0)}
              route="contas"
            />
          </ul>

          <div className={style.pizzaGraph}>
            <header className={style.outTitleGraph}>
              <h4>Vendas por produtos</h4>
            </header>

            <main>
              {graphPizzaData?.length > 0 ? (
                graphPizzaData?.map((pizza: any, key) => (
                  <div style={{ height: '100%' }} key={key}>
                    <PieChart width={350} height={230}>
                      <Pie
                        data={pizza.values}
                        innerRadius={40}
                        outerRadius={55}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="amount"
                      >
                        {pizza.values.map((entry: any, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={pizza.colors[index % pizza.colors.length]}
                          />
                        ))}
                      </Pie>
                      <Legend
                        verticalAlign="bottom"
                        height={38}
                        wrapperStyle={{
                          fontSize: '10px',
                          fontWeight: '500',
                          margin: '10px 0px',
                        }}
                      />
                      <Tooltip
                        content={<CustomTooltip formatarReal={true} />}
                      />
                    </PieChart>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    width: 350,
                    height: 230,
                  }}
                >
                  <h5>Nenhuma venda encontrada</h5>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
