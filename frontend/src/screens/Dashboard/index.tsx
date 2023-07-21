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
  LabelList,
} from 'recharts'
import { CustomLabel } from './tools/CustomLabel'
import { CustomTooltip } from './tools/CustomToolTip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDown,
  faAngleUp,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons'

interface PaymentType {
  type: string
  value: number
}

export function Dashboard() {
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  console.log('LOADING, ', loading)

  function getPaymentTypes() {
    setLoading(true)
    dashboardService
      .getPaymentTypes({ filters: {} })
      .then((res) => {
        const formatedPayments = res.data.items?.map((payment: any) => {
          return {
            label: payment.type,
            formatedData: format.formatarReal(payment.value || 0),
            rawData: payment.value || 0,
          }
        })
        setPaymentTypes(formatedPayments)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR FORMAS DE PAGAMENTO, ', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getPaymentTypes()
  }, [])

  return (
    <>
      <header className={style.headerPage}>
        <FilterDate />
      </header>

      <ul className={style.salesCardsContainer}>
        <li>Quantidade de vendas</li>
        <li>Valor das vendas</li>
        <li>Vendas canceladas</li>
      </ul>

      <div className={style.graphsContainer}>
        <div className={style.graph}>
          <header>
            <h4>Tipos de pagamento</h4>
          </header>
          <main>
            {(paymentTypes || []).length > 1 && (
              <div
                style={{
                  height: '98%',
                  width: '95%',
                  margin: '0 auto',
                  borderBottom: '1px solid rgb(148, 148, 148)',
                }}
              >
                <ResponsiveContainer>
                  <BarChart
                    margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
                    data={paymentTypes}
                  >
                    <Tooltip
                      content={
                        <CustomTooltip usarLabel={true} formatarReal={true} />
                      }
                    />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: '#292929', fontWeight: '600' }}
                      hide={true}
                    />
                    <Bar
                      dataKey="rawData"
                      fill="#39D4B9"
                      radius={[10, 10, 0, 0]}
                    >
                      <LabelList
                        position="top"
                        content={
                          <CustomLabel
                            usarLabel={true}
                            formatarReal={true}
                            position="top"
                            fill="#2e2e2e"
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
            <li className={style.card}>
              <header>
                <h4>Entradas</h4>
                <FontAwesomeIcon className={style.icon} icon={faAngleUp} />
              </header>
              <span>R$100,00</span>
            </li>
            <li className={style.card}>
              <header>
                <h4>Saídas</h4>
                <FontAwesomeIcon className={style.icon} icon={faAngleDown} />
              </header>
              <span>R$50,00</span>
            </li>
            <li className={style.card}>
              <header>
                <h4>Total</h4>
                <FontAwesomeIcon className={style.icon} icon={faDollarSign} />
              </header>
              <span>R$50,00</span>
            </li>
          </ul>

          <div style={{ minHeight: '300px', minWidth: '260px' }}>
            gráfico de pizza de produtos
          </div>
        </div>
      </div>
    </>
  )
}
