import style from './Login.module.scss'
import Link from 'next/link'
import { FormEvent, useContext, useState } from 'react'
import { usersService } from '../../../services/usersService'
import { useRouter } from 'next/router'
import { AlertContext } from '../../../contexts/alertContext'
import { CustomTextField } from '../../_ui/CustomTextField'
import { Loading } from '../../_ui/Loading'
import { httpClientProvider } from '../../../providers/HttpClientProvider'

export interface LoginUserData {
  email: string
  password: string
}

export function Login() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [userData, setUserData] = useState<LoginUserData>({
    email: '',
    password: '',
  })

  function onLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading) return
    if (!userData?.email) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: 'error',
        text: 'E-mail não informado',
        open: 'true',
      })
      return
    }

    if (!userData?.password) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: 'error',
        text: 'Senha não informada',
        open: 'true',
      })
      return
    }

    setLoading(true)
    usersService
      .login({ userData }, httpClientProvider)
      .then((res) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: 'success',
          text: 'Usuário autenticado com sucesso',
          open: 'true',
        })
        usersService.saveUser(res.data.user)
        usersService.saveToken(res.data.token)
        usersService.saveRefreshToken(res.data.refreshToken)
        router.push('/')
      })
      .catch((err) => {
        console.log('ERRO AO TENTAR REALIZAR LOGIN,', err)
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: 'error',
          text:
            'Erro ao tentar realizar autenticação do usuário ' +
            `(${err?.message})`,
          open: 'true',
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className={style.loginContainer}>
      <h2>Entrar com uma conta existente</h2>
      <form onSubmit={onLogin} className={style.formContainer}>
        <CustomTextField
          size="medium"
          value={userData?.email}
          className={style.input}
          type="email"
          label="E-mail"
          required
          placeholder="Digite seu E-mail"
          onChange={(event) => {
            setUserData({
              ...userData,
              email: event.target.value,
            })
          }}
        />
        <CustomTextField
          label="Senha"
          size="medium"
          required
          className={style.input}
          value={userData?.password}
          type="password"
          placeholder="Senha"
          onChange={(event) => {
            setUserData({
              ...userData,
              password: event.target.value,
            })
          }}
        />
        <button disabled={loading} type="submit">
          {loading ? <Loading size={13} /> : 'Entrar'}
        </button>
      </form>

      <Link href="/createAccount" className={style.createAccountLink}>
        Criar nova conta
      </Link>
    </div>
  )
}
