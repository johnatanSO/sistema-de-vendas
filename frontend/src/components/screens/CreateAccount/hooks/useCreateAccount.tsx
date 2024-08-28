import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { AlertContext } from '../../../../contexts/alertContext'
import { INewUser, newUserSchema } from '../interfaces/INewUser'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { usersService } from '../../../../services/usersService'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'

export function useCreateAccount() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
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

  async function onCreateAccount(newUser: INewUser) {
    await usersService
      .register({ ...newUser }, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: ALERT_NOTIFY_TYPE.SUCCESS,
          text: 'Usuário cadastrado com sucesso',
          open: true,
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
          open: true,
        })
      })
  }

  return {
    onCreateAccount,
    register,
    handleSubmit,
    isSubmitting,
    errors,
  }
}
