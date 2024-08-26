import style from './Login.module.scss'
import Link from 'next/link'
import { useContext } from 'react'
import { usersService } from '../../../services/usersService'
import { useRouter } from 'next/router'
import { AlertContext } from '../../../contexts/alertContext'
import { CustomTextField } from '../../_ui/CustomTextField'
import { Loading } from '../../_ui/Loading'
import { httpClientProvider } from '../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../models/enums/AlertNotifyType'
import { ILoginData, loginSchema } from './interfaces/ILoginData'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function Login() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isLoading, errors },
  } = useForm<ILoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const router = useRouter()

  function onLogin(loginData: ILoginData) {
    usersService
      .login({ ...loginData }, httpClientProvider)
      .then(async ({ data: { user, token, refreshToken } }) => {
        reset()

        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: ALERT_NOTIFY_TYPE.SUCCESS,
          text: 'Usuário autenticado com sucesso',
          open: 'true',
        })

        await Promise.all([
          await usersService.saveUser(user),
          await usersService.saveToken(token),
          await usersService.saveRefreshToken(refreshToken),
        ])

        router.push('/')
      })
      .catch((err) => {
        console.log('ERRO AO TENTAR REALIZAR LOGIN,', err)
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: ALERT_NOTIFY_TYPE.ERROR,
          text:
            'Erro ao tentar realizar autenticação do usuário ' +
            `(${err?.message})`,
          open: 'true',
        })
      })
  }

  return (
    <div className={style.loginContainer}>
      <h2>Entrar com uma conta existente</h2>
      <form onSubmit={handleSubmit(onLogin)} className={style.formContainer}>
        <CustomTextField
          size="medium"
          className={style.input}
          type="email"
          label="E-mail"
          placeholder="Digite seu E-mail"
          {...register('email')}
          error={!!errors.email}
          helperText={errors?.email && errors?.email?.message}
        />

        <CustomTextField
          label="Senha"
          size="medium"
          className={style.input}
          type="password"
          placeholder="Senha"
          {...register('password')}
          error={!!errors.password}
          helperText={errors?.password && errors?.password?.message}
        />
        <button disabled={isLoading} type="submit">
          {isLoading ? <Loading size={13} /> : 'Entrar'}
        </button>
      </form>

      <Link href="/createAccount" className={style.createAccountLink}>
        Criar nova conta
      </Link>
    </div>
  )
}
