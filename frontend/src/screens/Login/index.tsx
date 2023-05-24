import Link from 'next/link'
import React from 'react'
import style from './Login.module.scss'
/* import { api } from '../../services/api'
import { userDataContext } from '../../userDataContext'
import Loading from '../Loading'
 */
export function Login() {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
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
      <h2>Entrar com uma conta existente</h2>
      <div className={style.inputs}>
        <input
          value={email}
          type="text"
          name="email"
          id="email"
          placeholder="E-mail"
          /*        onChange={(e) => {
            // setEmail(e.target.value)
          }} */
        />
        <input
          value={password}
          type="password"
          name="password"
          id="passwordLogin"
          placeholder="Senha"
          /*           onChange={(e) => {
            // setPassword(e.target.value)
          }} */
        />
        <button disabled={false} type="submit">
          Entrar
        </button>
      </div>

      <Link href="/createAccount" className={style.createAccountLink}>
        Criar nova conta
      </Link>
    </form>
  )
}
