import { HeaderPage } from '../../_ui/HeaderPage'
import { ModalCreateNewSale } from './ModalCreateNewSale'
import { TableComponent } from '../../_ui/TableComponent'
import { IColumn } from '../../../models/interfaces/IColumn'
import { useColumns } from './hooks/useColumns'
import { FilterDate } from '../../_ui/FilterDate'
import style from './Sales.module.scss'
import { ListMobile } from '../../_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { useSaleList } from '../../../hooks/useSaleList'
import { useCancelSale } from './hooks/useCancelSale'
import { useEditSale } from './hooks/useEditSale'

export function Sales() {
  const { handleCancelSale } = useCancelSale()
  const { sales, loadingSales } = useSaleList({ otherFilters: null })
  const {
    formModalOpened,
    handleEditSale,
    saleToEditData,
    setFormModalOpened,
    setSaleToEditData,
  } = useEditSale()

  const columns: IColumn[] = useColumns({
    handleEditSale,
    handleCancelSale,
  })

  const fieldsMobile = useFieldsMobile()

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Nova venda"
        InputFilter={<FilterDate />}
      />

      <div className={style.viewDesktop}>
        <TableComponent
          emptyText="Nenhuma venda encontrada"
          loading={loadingSales}
          columns={columns}
          rows={sales}
        />
      </div>

      <div className={style.viewMobile}>
        <ListMobile
          emptyText="Nenhuma venda encontrada"
          loading={loadingSales}
          collapseItems={columns}
          itemFields={fieldsMobile}
          items={sales}
        />
      </div>

      {formModalOpened && (
        <ModalCreateNewSale
          open={formModalOpened}
          saleToEditData={saleToEditData}
          handleClose={() => {
            setFormModalOpened(false)
            setSaleToEditData(null)
          }}
        />
      )}
    </>
  )
}
