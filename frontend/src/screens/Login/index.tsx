import style from './Login.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import { usersService } from '../../services/usersService'
import { useRouter } from 'next/router'

export interface LoginUserData {
  email: string
  password: string
}

export function Login() {
  const [userData, setUserData] = useState<LoginUserData>({
    email: '',
    password: '',
  })
  const router = useRouter()

  function onLogin() {
    if (!userData?.email) return alert('Digite um e-mail')
    if (!userData?.password) return alert('Digite a sua senha')

    usersService
      .login({ userData })
      .then(() => {
        router.push('/')
      })
      .catch(() => {
        alert('Erro ao tentar fazer login')
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
