import style from './Login.module.scss'
import Link from 'next/link'
import { CustomTextField } from '../../_ui/CustomTextField'
import { Loading } from '../../_ui/Loading'
import { useFormAuth } from './hooks/useFormAuth'

export function Login() {
  const { errors, handleSubmit, isSubmitting, onLogin, register } =
    useFormAuth()

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
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? <Loading size={15} /> : 'Entrar'}
        </button>
      </form>

      <Link href="/createAccount" className={style.createAccountLink}>
        Criar nova conta
      </Link>
    </div>
  )
}
