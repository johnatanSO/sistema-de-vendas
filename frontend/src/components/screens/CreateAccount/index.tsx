import style from './CreateAccount.module.scss'
import Link from 'next/link'
import { FormEvent, useContext, useState } from 'react'
import { usersService } from '../../../services/usersService'
import { AlertContext } from '../../../contexts/alertContext'
import { CustomTextField } from '../../_ui/CustomTextField'
import { Loading } from '../../_ui/Loading'
import { useRouter } from 'next/router'

export interface NewUser {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export function CreateAccount() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const defaultValuesNewUser = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [newUser, setNewUser] = useState<NewUser>(defaultValuesNewUser)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  function onCreateAccount(event: FormEvent<HTMLFormElement>) {
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
      .then(({ data }) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: 'success',
          text: 'Usuário cadastrado com sucesso',
          open: 'true',
        })
        usersService.saveUser(data)
        router.push('/')
      })
      .catch((err) => {
        console.log('ERRO AO TENTAR CADASTRAR USUÁRIO, ', err)
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: 'error',
          text:
            'Erro ao tentar cadastrar usuário ' + err?.response?.data?.message,
          open: 'true',
        })
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
          type="email"
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
        <CustomTextField
          required
          label="Confirmar a senha"
          className={style.input}
          error={newUser.password !== newUser.confirmPassword}
          value={newUser.confirmPassword}
          onChange={(e) => {
            setNewUser({
              ...newUser,
              confirmPassword: e.target.value,
            })
          }}
          type="password"
          placeholder="Digite novamente a senha"
        />
        <button disabled={loading} type="submit">
          {loading ? <Loading size={15} /> : 'Cadastrar'}
        </button>
      </form>
      <Link href="/login" className={style.loginAccountLink}>
        Entrar com conta existente
      </Link>
    </div>
  )
}
