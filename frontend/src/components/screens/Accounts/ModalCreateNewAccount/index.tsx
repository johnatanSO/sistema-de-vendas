import { ModalLayout } from '../../../_ui/ModalLayout'
import style from './ModalCreateNewAccount.module.scss'
import { CustomTextField } from '../../../_ui/CustomTextField'
import { ACCOUNT_TYPE } from '../../../../models/enums/AccountType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { IAccount } from '../../../../models/interfaces/IAccount'
import { useFormAccount } from '../hooks/useFormAccount'

interface Props {
  accountDataToEdit: IAccount | null
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewAccount({
  open,
  handleClose,
  accountDataToEdit,
}: Props) {
  const {
    onCreateNewAccount,
    onEditAccount,
    accountType,
    errors,
    handleSubmit,
    isSubmitting,
    register,
    setValue,
  } = useFormAccount({
    accountDataToEdit,
    handleClose,
  })

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={handleSubmit(
        accountDataToEdit ? onEditAccount : onCreateNewAccount,
      )}
      title="Cadastro de conta"
      submitButtonText="Cadastrar"
      loading={isSubmitting}
      customStyle={{ width: '500px' }}
    >
      <div className={style.fieldsContainer}>
        <CustomTextField
          size="small"
          label="Descrição *"
          type="text"
          placeholder="Digite uma descrição para a conta"
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description && errors.description.message}
        />
        <CustomTextField
          size="small"
          label="Categoria"
          type="text"
          placeholder="Digite uma categoria para a conta"
          {...register('category')}
        />

        <div className={style.selectTypeContainer}>
          <button
            type="button"
            style={{ opacity: accountType === ACCOUNT_TYPE.IN ? 1 : 0.5 }}
            disabled={accountType === ACCOUNT_TYPE.IN}
            className={`${style.typeButton} ${style.inButton}`}
            onClick={() => {
              setValue('type', ACCOUNT_TYPE.IN)
            }}
          >
            <FontAwesomeIcon className={style.icon} icon={faArrowUp} /> Entrada
          </button>

          <button
            type="button"
            style={{ opacity: accountType === ACCOUNT_TYPE.OUT ? 1 : 0.5 }}
            disabled={accountType === ACCOUNT_TYPE.OUT}
            className={`${style.typeButton} ${style.outButton}`}
            onClick={() => {
              setValue('type', ACCOUNT_TYPE.OUT)
            }}
          >
            <FontAwesomeIcon className={style.icon} icon={faArrowDown} /> Saída
          </button>
        </div>

        <CustomTextField
          size="small"
          label="Valor"
          type="number"
          placeholder="Digite o valor"
          {...register('value', { required: true, valueAsNumber: true })}
          error={!!errors.value}
          helperText={errors.value && errors?.value?.message}
        />
      </div>
    </ModalLayout>
  )
}
