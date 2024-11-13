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
import { CustomTooltipPizzaGraph } from './tools/CustomToolTipPizzaGraph'
import { Card } from './partials/Card'
import { useTotalAccounts } from './hooks/useTotalAccounts'
import { useTotalSales } from './hooks/useTotalSales'
import { usePizzaGraph } from './hooks/usePizzaGraph'
import { useProducts } from './hooks/useProducts'
import { CustomTooltipBarGraph } from './tools/CustomToolTipBarGraph'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowUp,
  faCancel,
  faDollarSign,
  faTag,
} from '@fortawesome/free-solid-svg-icons'
import { useSaleList } from '../../../hooks/useSaleList'
import { useAccountList } from '../../../hooks/useAccountList'
import { usePayments } from './hooks/usePayments'
import { ACCOUNT_STATUS } from '../../../models/enums/AccountStatus'

export function Dashboard() {
  const { paymentTypes } = usePayments()
  const { sales } = useSaleList({
    otherFilters: null,
  })

  const { accounts } = useAccountList({
    otherFilters: {
      status: ACCOUNT_STATUS.PAID,
    },
  })

  const totalAccounts = useTotalAccounts(accounts)
  const totalSales = useTotalSales(sales)
  const products = useProducts(sales)
  const graphPizzaData = usePizzaGraph(products)

  return (
    <>
      <header className={style.headerPage}>
        <FilterDate />
      </header>

      <section className={style.cardsAndProductsContainer}>
        <div className={style.cardsContainer}>
          <ul>
            <Card
              title="Quantidade de vendas"
              value={sales?.length || 0}
              icon={<FontAwesomeIcon className={style.icon} icon={faTag} />}
              route="vendas"
              className="amountCard"
            />

            <Card
              title="Vendas aprovadas"
              value={format.formatarReal(totalSales?.totalValueApproved || 0)}
              icon={
                <FontAwesomeIcon className={style.icon} icon={faDollarSign} />
              }
              route="vendas"
              className="valueCard"
            />

            <Card
              title="Vendas canceladas"
              value={format.formatarReal(totalSales.totalValueCanceled || 0)}
              icon={<FontAwesomeIcon className={style.icon} icon={faCancel} />}
              route="vendas"
              query={{ status: 'canceled' }}
              className="valueCanceledCard"
            />
          </ul>

          <ul>
            <Card
              title="Contas de entrada"
              className="inCard"
              icon={<FontAwesomeIcon className={style.icon} icon={faArrowUp} />}
              value={format.formatarReal(totalAccounts.inTotalValue || 0)}
              route="contas"
              query={{
                accountType: 'in',
              }}
            />
            <Card
              title="Contas de saída"
              className="outCard"
              icon={
                <FontAwesomeIcon className={style.icon} icon={faArrowDown} />
              }
              value={format.formatarReal(totalAccounts.outTotalValue || 0)}
              route="contas"
              query={{
                accountType: 'out',
              }}
            />
            <Card
              title="Total"
              className="totalCard"
              icon={
                <FontAwesomeIcon className={style.icon} icon={faDollarSign} />
              }
              value={format.formatarReal(
                totalAccounts.inTotalValue - totalAccounts.outTotalValue || 0,
              )}
              route="contas"
            />
          </ul>
        </div>

        <div className={style.pizzaGraph}>
          <header className={style.outTitleGraph}>
            <h4>Vendas por produtos</h4>
          </header>

          <main>
            {graphPizzaData?.values?.length > 0 ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <PieChart width={350} height={300}>
                  <Pie
                    data={graphPizzaData.values}
                    innerRadius={40}
                    outerRadius={55}
                    fill="#8884d8"
                    paddingAngle={10}
                    dataKey="amount"
                  >
                    {graphPizzaData.values.map((entry: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          graphPizzaData.colors[
                            index % graphPizzaData.colors.length
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    height={38}
                    wrapperStyle={{
                      fontSize: '0.775rem',
                      fontWeight: '500',
                      margin: '10px 0px',
                    }}
                  />
                  <Tooltip content={<CustomTooltipPizzaGraph />} />
                </PieChart>
              </div>
            ) : (
              <div
                style={{
                  width: 350,
                  height: 300,
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
      </section>

      <div className={style.graphPayments}>
        <header>
          <h4>Tipos de pagamento</h4>
        </header>

        <main>
          {paymentTypes?.length > 0 ? (
            <div
              style={{
                height: '680px',
                width: '100%',
                margin: '0 auto',
              }}
            >
              <ResponsiveContainer>
                <BarChart
                  margin={{ top: 40, right: 0, bottom: 0, left: 0 }}
                  data={paymentTypes}
                >
                  <Tooltip content={<CustomTooltipBarGraph />} />
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
                          fill="#e2e2e2"
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

      <div className={style.graphsContainer}>
        <div className={style.sideRightContainer}>
          <ul className={style.accountsCardsContainer}></ul>
        </div>
      </div>
    </>
  )
}
