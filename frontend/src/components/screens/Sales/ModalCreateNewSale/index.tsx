import { ModalLayout } from '../../../_ui/ModalLayout'
import style from './ModalCreateNewSale.module.scss'
import { CustomTextField } from '../../../_ui/CustomTextField'
import { Autocomplete, MenuItem } from '@mui/material'
import { paymentTypeList } from '../../../../models/constants/PaymentTypeList'
import { format } from '../../../../utils/format'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ISale } from '../../../../models/interfaces/ISale'
import { useClientList } from '../../../../hooks/useClientList'
import { useFormSale } from '../hooks/useFormSale'
import { useProductList } from '../../../../hooks/useProductList'

interface Props {
  saleToEditData: ISale | null
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewSale({
  open,
  handleClose,
  saleToEditData,
}: Props) {
  const { products: productsList } = useProductList()
  const { clients: clientsList } = useClientList()

  const {
    errors,
    handleSubmit,
    isSubmitting,
    onCreateNewSale,
    onEditSale,
    products,
    register,
    setValue,
    totalValue,
    handleAddNewProduct,
    handleChangeProduct,
    handleRemoveProduct,
  } = useFormSale({
    handleClose,
    saleToEditData,
    productsList,
  })

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={handleSubmit(saleToEditData ? onEditSale : onCreateNewSale)}
      title={saleToEditData ? 'Editar venda' : 'Realizar nova venda'}
      submitButtonText={saleToEditData ? 'Atualizar' : 'Finalizar'}
      loading={isSubmitting}
    >
      <div className={style.content}>
        <section className={style.sectionContainer}>
          <h3>Informações da venda</h3>
          <div className={style.fieldsContainer}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={clientsList}
              noOptionsText="Nenhum cliente encontrado"
              loadingText="Buscando clientes..."
              onChange={(event, value) => {
                setValue('clientId', value?._id || null)
              }}
              getOptionLabel={(client) => client.name}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  size="small"
                  className={style.input}
                  label="Cliente"
                  type="text"
                  placeholder="Digite o nome do cliente"
                />
              )}
            />

            <CustomTextField
              size="small"
              className={style.input}
              label="Forma de pagamento *"
              select
              placeholder="Escolha a forma de pagamento"
              {...register('paymentType')}
              error={!!errors.paymentType}
              helperText={errors.paymentType && errors.paymentType.message}
            >
              {paymentTypeList.map(({ text, value }) => {
                return (
                  <MenuItem key={value} value={value}>
                    {text || '--'}
                  </MenuItem>
                )
              })}
            </CustomTextField>

            <CustomTextField
              size="small"
              className={style.input}
              label="Produtos"
              select
              placeholder="Selecione um produto"
              onChange={handleAddNewProduct}
            >
              {productsList.map(({ _id, name }) => {
                return (
                  <MenuItem key={_id} value={_id}>
                    {name || '--'}
                  </MenuItem>
                )
              })}
            </CustomTextField>
          </div>
        </section>
        <section className={style.sectionContainer}>
          <div className={style.headerProductsList}>
            <h3>Produtos</h3>
            {products.length > 0 && (
              <span>{format.formatarReal(totalValue || 0)}</span>
            )}
          </div>
          {products.length > 0 ? (
            <ul className={style.listProducts}>
              {products.map((product, index) => {
                return (
                  <li key={product?._id}>
                    <span>{product?.name}</span>
                    <CustomTextField
                      className={style.inputProduct}
                      label="Quantidade"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      value={product?.amount}
                      name="amount"
                      type="number"
                      onChange={(event) => {
                        handleChangeProduct(event, index)
                      }}
                    />
                    <CustomTextField
                      className={style.inputProduct}
                      label="Valor"
                      type="number"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      value={product?.value}
                      name="value"
                      onChange={(event) => {
                        handleChangeProduct(event, index)
                      }}
                    />

                    <FontAwesomeIcon
                      onClick={() => {
                        handleRemoveProduct(product?._id)
                      }}
                      className={style.removeProductIcon}
                      icon={faTrash}
                    />
                  </li>
                )
              })}
            </ul>
          ) : (
            <div>
              <span>Nenhum produto selecionado</span>
            </div>
          )}
        </section>
      </div>
    </ModalLayout>
  )
}
