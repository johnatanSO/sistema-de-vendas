import style from './CreateAccount.module.scss'
import Link from 'next/link'
import { FormEvent, useContext, useState } from 'react'
import { usersService } from '../../services/usersService'
import { useRouter } from 'next/router'
import { AlertContext } from '../../../src/contexts/alertContext'
import { CustomTextField } from '../../components/CustomTextField'
import { Loading } from '../../components/Loading'

export interface NewUser {
  name: string
  email: string
  password: string
}

export function CreateAccount() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const defaultValuesNewUser = {
    name: '',
    email: '',
    password: '',
  }
  const [newUser, setNewUser] = useState<NewUser>(defaultValuesNewUser)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  async function onCreateAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading) return
    if (!newUser?.email) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: 'error',
        text: 'E-mail não informado',
        open: 'true',
      })
      return
    }

    if (!newUser?.password) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: 'error',
        text: 'Senha não informada',
        open: 'true',
      })
      return
    }

    if (!newUser?.name) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: 'error',
        text: 'Nome não informada',
        open: 'true',
      })
      return
    }

    setLoading(true)
    usersService
      .register({ newUser })
      .then((res) => {
        usersService.saveUser(res.data.item)
        router.push('/')
      })
      .catch((err) => {
        console.log('ERRO AO TENTAR CADASTRAR USUÁRIO, ', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className={style.createAccountContainer}>
      <h2>Criar uma nova conta</h2>
      <form onSubmit={onCreateAccount} className={style.formContainer}>
        <CustomTextField
          onChange={(e) => {
            setNewUser({
              ...newUser,
              name: e.target.value,
            })
          }}
          required
          value={newUser.name}
          type="text"
          label="Nome"
          className={style.input}
          placeholder="Digite seu nome"
        />
        <CustomTextField
          required
          label="E-mail"
          className={style.input}
          onChange={(e) => {
            setNewUser({
              ...newUser,
              email: e.target.value,
            })
          }}
          value={newUser.email}
          type="text"
          placeholder="Digite seu E-mail"
        />
        <CustomTextField
          required
          label="Senha"
          className={style.input}
          value={newUser.password}
          onChange={(e) => {
            setNewUser({
              ...newUser,
              password: e.target.value,
            })
          }}
          type="password"
          placeholder="Digite uma senha"
        />
        <button disabled={loading} type="submit">
          {loading ? <Loading /> : 'Cadastrar'}
        </button>
      </form>
      <Link href="/login" className={style.loginAccountLink}>
        Entrar com conta existente
      </Link>
    </div>
  )
}
