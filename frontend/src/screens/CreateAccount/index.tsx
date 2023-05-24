import Link from 'next/link'
import React from 'react'
import style from './CreateAccount.module.scss'
/* import { api } from '../../services/api'
import { userDataContext } from '../../userDataContext'
import Loading from '../Loading'
 */
export function CreateAccount() {
  // const [usernameOrEmail, setUsernameOrEmail] = useState('')
  // const [password, setPassword] = useState('')
  const nome = ''
  const email = ''
  const password = ''
  /*   const { setName, setToken } = useContext(userDataContext)
  const [loading, setLoading] = useState(false)

  async function handleLogin(event) {
    event.preventDefault()
    if (!usernameOrEmail || !password) {
      alert('Por favor, preencha todos os campos')
      return
    }
    setLoading(true)
    await api
      .post('user/login', {
        id: Math.random() * 100,
        usernameOrEmail,
        password,
      })
      .then(async (res) => {
        if (res.status === 200) {
          await setName(res.data.user.username)
          await setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert('Usuário e/ou senha inválido(s)')
          setUsernameOrEmail('')
          setPassword('')
        }
      })
    setLoading(false)
  } */

  return (
    <form className={style.formContainer}>
      <h2>Criar uma nova conta</h2>
      <div className={style.inputs}>
        <input
          /* onChange={(e) => {
            setUsernameOrEmail(e.target.value)
          }} */
          value={nome}
          type="text"
          placeholder="Nome de usuário"
        />
        <input
          /* onChange={(e) => {
            setUsernameOrEmail(e.target.value)
          }} */
          value={email}
          type="text"
          placeholder="E-mail"
        />
        <input
          value={password}
          /* onChange={(e) => {
            setPassword(e.target.value)
          }} */
          type="password"
          name="password"
          id="passwordLogin"
          placeholder="Senha"
        />
        <button type="submit">Cadastrar</button>
      </div>
      <Link href="/login" className={style.loginAccountLink}>
        Entrar com conta existente
      </Link>
    </form>
  )
}
