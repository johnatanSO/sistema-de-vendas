import style from './Login.module.scss'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { usersService } from '../../services/usersService'
import { useRouter } from 'next/router'
import { AlertContext } from '../../../src/contexts/alertContext'

export interface LoginUserData {
  email: string
  password: string
}

export function Login() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [userData, setUserData] = useState<LoginUserData>({
    email: '',
    password: '',
  })
  const router = useRouter()

  function onLogin() {
    if (!userData?.email) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: 'error',
        text: 'E-mail não informado',
        open: 'true',
      })
    }
    if (!userData?.password) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: 'error',
        text: 'Senha não informada',
        open: 'true',
      })
    }

    usersService
      .login({ userData })
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: 'success',
          text: 'Usuário autenticado com sucesso',
          open: 'true',
        })
        router.push('/')
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: 'error',
          text:
            'Erro ao tentar realizar autenticação do usuário ' +
            `(${err.response.data.message})`,
          open: 'true',
        })
      })
  }

  return (
    <div className={style.loginContainer}>
      <h2>Entrar com uma conta existente</h2>
      <form onSubmit={onLogin} className={style.formContainer}>
        <input
          value={userData?.email}
          type="text"
          placeholder="Digite seu E-mail"
          onChange={(event) => {
            setUserData({
              ...userData,
              email: event.target.value,
            })
          }}
        />
        <input
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
        <button type="submit">Entrar</button>
      </form>

      <Link href="/createAccount" className={style.createAccountLink}>
        Criar nova conta
      </Link>
    </div>
  )
}
