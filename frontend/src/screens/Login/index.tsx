import style from './Login.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import { usersService } from '../../services/usersService'
import { useRouter } from 'next/router'

export function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  function onLogin() {
    if (!email) return alert('Digite um E-mail')
    if (!password) return alert('Digite a sua senha')

    usersService
      .login()
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
          value={email}
          type="text"
          placeholder="Digite seu E-mail"
          onChange={(event) => {
            setEmail(event.target.value)
          }}
        />
        <input
          value={password}
          type="password"
          placeholder="Senha"
          onChange={(event) => {
            setPassword(event.target.value)
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
