import Link from 'next/link'
import React, { useState } from 'react'
import style from './CreateAccount.module.scss'
import { usersService } from '@/src/services/usersService'

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

  async function onCreateAccount(event: any) {
    event.preventDefault()
    usersService
      .register(newUser)
      .then(() => {})
      .catch((err) => {
        console.log(err)
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
        <button type="submit">Cadastrar</button>
      </form>
      <Link href="/login" className={style.loginAccountLink}>
        Entrar com conta existente
      </Link>
    </div>
  )
}
