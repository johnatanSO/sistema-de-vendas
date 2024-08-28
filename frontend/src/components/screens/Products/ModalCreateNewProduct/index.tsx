import { ModalLayout } from '../../../_ui/ModalLayout'
import style from './ModalCreateNewProduct.module.scss'
import { CustomTextField } from '../../../_ui/CustomTextField'
import { Checkbox, FormControlLabel, Popover, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { IProduct } from '../../../../models/interfaces/IProduct'
import { useFormProduct } from '../hooks/useFormProduct'

interface Props {
  productDataToEdit: IProduct | null
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewProduct({
  open,
  handleClose,
  productDataToEdit,
}: Props) {
  const {
    onCreateNewProduct,
    onEditProduct,
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    isDefault,
    anchorEl,
    setAnchorEl,
  } = useFormProduct({
    handleClose,
    productDataToEdit,
  })

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={handleSubmit(
        productDataToEdit ? onEditProduct : onCreateNewProduct,
      )}
      title="Cadastro de produto"
      submitButtonText="Cadastrar"
      loading={isSubmitting}
    >
      <div className={style.fieldsContainer}>
        <CustomTextField
          size="small"
          label="Nome *"
          type="text"
          placeholder="Digite o nome"
          {...register('name', { required: true })}
          error={!!errors?.name}
          helperText={errors.name && errors?.name?.message}
        />

        <CustomTextField
          size="small"
          label="Quantidade"
          type="number"
          placeholder="Digite a quantidade"
          {...register('stock', { required: true, valueAsNumber: true })}
          error={!!errors.stock}
          helperText={errors.stock && errors?.stock?.message}
        />

        <div className={style.labelDefaultProduct}>
          <FormControlLabel
            onChange={(event: any) => {
              setValue('isDefault', event.target.checked)
            }}
            control={
              <Checkbox
                checked={isDefault}
                sx={{
                  '&.Mui-checked': { color: '#ff6600' },
                }}
              />
            }
            label="Tornar este produto padrão"
          />

          <FontAwesomeIcon
            icon={faInfoCircle}
            className={style.infoIcon}
            onClick={(event) => {
              setAnchorEl(event.currentTarget)
            }}
          />

          <Popover
            id="simple-popover"
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={() => {
              setAnchorEl(null)
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }} className={style.popover}>
              Ao definir um produto como padrão, ele será selecionado
              automaticamente no momento de realizar uma venda.
            </Typography>
          </Popover>
        </div>

        <CustomTextField
          size="small"
          label="Valor"
          type="number"
          placeholder="Digite o valor"
          {...register('value', { valueAsNumber: true })}
        />
      </div>
    </ModalLayout>
  )
}
