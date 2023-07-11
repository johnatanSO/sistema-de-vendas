import style from './CreateAccount.module.scss'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { usersService } from '../../services/usersService'
import { useRouter } from 'next/router'

export interface NewUser {
  name: string
  email: string
  password: string
}

export function CreateAccount() {
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
    setLoading(true)
    usersService
      .register({ newUser })
      .then(() => {
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className={style.createAccountContainer}>
      <h2>Criar uma nova conta</h2>
      <form onSubmit={onCreateAccount} className={style.formContainer}>
        <input
          onChange={(e) => {
            setNewUser({
              ...newUser,
              name: e.target.value,
            })
          }}
          required
          value={newUser.name}
          type="text"
          placeholder="Digite seu nome"
        />
        <input
          required
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
        <input
          required
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
          {loading ? <>Carregando...</> : 'Cadastrar'}
        </button>
      </form>
      <Link href="/login" className={style.loginAccountLink}>
        Entrar com conta existente
      </Link>
    </div>
  )
}
