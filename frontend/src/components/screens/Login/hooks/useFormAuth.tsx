import { useRouter } from 'next/router'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { usersService } from '../../../../services/usersService'
import { ILoginData, loginSchema } from '../interfaces/ILoginData'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AlertContext } from '../../../../contexts/alertContext'
import { useContext } from 'react'

export function useFormAuth() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
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
          open: true,
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
          open: true,
        })
      })
  }

  return {
    onLogin,
    register,
    errors,
    handleSubmit,
    isSubmitting,
  }
}
