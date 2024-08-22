import style from './CreateAccount.module.scss'
import Link from 'next/link'
import { useContext } from 'react'
import { usersService } from '../../../services/usersService'
import { AlertContext } from '../../../contexts/alertContext'
import { CustomTextField } from '../../_ui/CustomTextField'
import { Loading } from '../../_ui/Loading'
import { useRouter } from 'next/router'
import { httpClientProvider } from '../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../models/enums/AlertNotifyType'
import { useForm } from 'react-hook-form'
import { INewUser } from './interfaces/INewUser'

export function CreateAccount() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isLoading, errors },
  } = useForm<INewUser>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const router = useRouter()
  const [password, confirmPassword] = watch(['password', 'confirmPassword'])

  function onCreateAccount(newUser: INewUser) {
    usersService
      .register({ ...newUser }, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: ALERT_NOTIFY_TYPE.SUCCESS,
          text: 'Usuário cadastrado com sucesso',
          open: 'true',
        })

        reset()

        router.push('/login')
      })
      .catch((err) => {
        console.log('ERRO AO TENTAR CADASTRAR USUÁRIO, ', err)
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: ALERT_NOTIFY_TYPE.ERROR,
          text: `Erro ao tentar cadastrar usuário - ${err?.message}`,
          open: 'true',
        })
      })
  }

  return (
    <div className={style.createAccountContainer}>
      <h2>Criar uma nova conta</h2>
      <form
        onSubmit={handleSubmit(onCreateAccount)}
        className={style.formContainer}
      >
        <CustomTextField
          type="text"
          label="Nome"
          className={style.input}
          placeholder="Digite seu nome"
          {...register('name')}
          error={!!errors?.name}
          helperText={errors?.name && errors?.name?.message}
        />
        <CustomTextField
          required
          label="E-mail"
          className={style.input}
          {...register('email')}
          type="email"
          placeholder="Digite seu E-mail"
        />
        <CustomTextField
          required
          label="Senha"
          className={style.input}
          {...register('password')}
          type="password"
          placeholder="Digite uma senha"
        />
        <CustomTextField
          label="Confirmar a senha"
          className={style.input}
          error={password !== confirmPassword}
          {...register('confirmPassword')}
          type="password"
          placeholder="Digite novamente a senha"
        />
        <button disabled={isLoading} type="submit">
          {isLoading ? <Loading size={13} /> : 'Cadastrar'}
        </button>
      </form>
      <Link href="/login" className={style.loginAccountLink}>
        Entrar com conta existente
      </Link>
    </div>
  )
}
// 161
