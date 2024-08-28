import { HeaderPage } from '../../_ui/HeaderPage'
import { ModalCreateNewSupplier } from './ModalCreateNewSupplier'
import { TableComponent } from '../../_ui/TableComponent'
import { IColumn } from '../../../models/interfaces/IColumn'
import { useColumns } from './hooks/useColumns'
import style from './Suppliers.module.scss'
import { ListMobile } from '../../_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { FilterByName } from '../../_ui/FilterByName'
import { useDeleteSupplier } from './hooks/useDeleteSupplier'
import { useEditSupplier } from './hooks/useEditSupplier'
import { useSupplierList } from '../../../hooks/useSupplierList'

export function Suppliers() {
  const { suppliers, loadingSuppliers } = useSupplierList()

  const { handleDeleteSupplier } = useDeleteSupplier()
  const {
    formModalOpened,
    handleEditSupplier,
    setFormModalOpened,
    setSupplierDataToEdit,
    supplierDataToEdit,
  } = useEditSupplier()

  const columns: IColumn[] = useColumns({
    handleEditSupplier,
    handleDeleteSupplier,
  })

  const fieldsMobile = useFieldsMobile()

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Novo fornecedor"
        InputFilter={<FilterByName />}
      />

      <div className={style.viewDesktop}>
        <TableComponent
          loading={loadingSuppliers}
          columns={columns}
          rows={suppliers}
          emptyText="Nenhum fornecedor encontrado"
          heightSkeleton={40}
        />
      </div>

      <div className={style.viewMobile}>
        <ListMobile
          loading={loadingSuppliers}
          items={suppliers}
          emptyText="Nenhum fornecedor encontrado"
          collapseItems={columns}
          itemFields={fieldsMobile}
        />
      </div>

      {formModalOpened && (
        <ModalCreateNewSupplier
          supplierDataToEdit={supplierDataToEdit}
          open={formModalOpened}
          handleClose={() => {
            setFormModalOpened(false)
            setSupplierDataToEdit(null)
          }}
        />
      )}
    </>
  )
}
