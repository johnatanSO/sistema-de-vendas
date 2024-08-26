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
import { INewUser, newUserSchema } from './interfaces/INewUser'
import { zodResolver } from '@hookform/resolvers/zod'

export function CreateAccount() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isLoading, errors },
  } = useForm<INewUser>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(newUserSchema),
  })

  const router = useRouter()

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
          type="email"
          placeholder="Digite seu E-mail"
          {...register('email')}
          error={!!errors?.email}
          helperText={errors?.email && errors?.email?.message}
        />
        <CustomTextField
          required
          label="Senha"
          className={style.input}
          type="password"
          placeholder="Digite uma senha"
          {...register('password')}
          error={!!errors?.password}
          helperText={errors?.password && errors?.password?.message}
        />
        <CustomTextField
          label="Confirmar a senha"
          className={style.input}
          type="password"
          placeholder="Digite novamente a senha"
          {...register('confirmPassword')}
          error={!!errors?.confirmPassword}
          helperText={
            errors?.confirmPassword && errors?.confirmPassword?.message
          }
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
