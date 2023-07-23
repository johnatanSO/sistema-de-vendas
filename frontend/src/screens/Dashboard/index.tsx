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

interface PaymentType {
  type: string
  value: number
}

export function Dashboard() {
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  console.log('LOADING, ', loading)

  function getPaymentTypes() {
    setLoading(true)
    dashboardService
      .getPaymentTypes({ filters: {} })
      .then((res) => {
        const formatedPayments = res.data.items?.map((payment: any) => {
          return {
            label: format.formatarFormaDePagamento(payment.type),
            formatedData: format.formatarReal(payment.value || 0) + ' | 11',
            Valor: payment.value || 0,
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
  function getAccounts() {
    accountsService.getAll({ filters: {} })
  }

  useEffect(() => {
    Promise.all([getPaymentTypes(), getAccounts()])
  }, [router.query])

  return (
    <>
      <header className={style.headerPage}>
        <FilterDate />
      </header>

      <ul className={style.salesCardsContainer}>
        <li className={`${style.card} ${style.amountCard}`}>
          <header>
            <h4>Quantidade de vendas</h4>
            <FontAwesomeIcon className={style.icon} icon={faBagShopping} />
          </header>
          <span>50</span>
        </li>
        <li className={`${style.card} ${style.valueCard}`}>
          <header>
            <h4>Valor de vendas</h4>
            <FontAwesomeIcon className={style.icon} icon={faDollarSign} />
          </header>
          <span>R$100,00</span>
        </li>
        <li className={`${style.card} ${style.valueCanceledCard}`}>
          <header>
            <h4>Vendas canceladas</h4>
            <FontAwesomeIcon className={style.icon} icon={faCancel} />
          </header>
          <span>R$100,00</span>
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
            <li className={`${style.card} ${style.inCard}`}>
              <header>
                <h4>Entradas</h4>
                <FontAwesomeIcon className={style.icon} icon={faAngleUp} />
              </header>
              <span>R$100,00</span>
            </li>
            <li className={`${style.card} ${style.outCard}`}>
              <header>
                <h4>Saídas</h4>
                <FontAwesomeIcon className={style.icon} icon={faAngleDown} />
              </header>
              <span>R$50,00</span>
            </li>
            <li className={`${style.card} ${style.totalCard}`}>
              <header>
                <h4>Total</h4>
                <FontAwesomeIcon className={style.icon} icon={faDollarSign} />
              </header>
              <span>R$50,00</span>
            </li>
          </ul>

          <div className={style.pizzaGraph}>gráfico de pizza de produtos</div>
        </div>
      </div>
    </>
  )
}
