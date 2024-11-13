import style from './CreateAccount.module.scss'
import Link from 'next/link'

import { CustomTextField } from '../../_ui/CustomTextField'
import { Loading } from '../../_ui/Loading'
import { useCreateAccount } from './hooks/useCreateAccount'

export function CreateAccount() {
  const { errors, handleSubmit, isSubmitting, onCreateAccount, register } =
    useCreateAccount()
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
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? <Loading size={15} /> : 'Cadastrar'}
        </button>
      </form>
      <Link href="/login" className={style.loginAccountLink}>
        Entrar com conta existente
      </Link>
    </div>
  )
}
// 161
