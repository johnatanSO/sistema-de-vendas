import { View, FlatList } from 'react-native'
import { EmptyItems } from '../../../components/EmptyItems'
import { styles } from './ProductsList.styles'
import { useEffect, useState } from 'react'
import { ButtonCreateNew } from '../../../components/ButtonCreateNew'
import { ModalCreateNewProduct } from './ModalCreateNewProduct'
import { productsService } from '../../../services/productsService.service'
import { Loading } from '../../../components/Loading'
import { ListItem } from './ListItem'

export interface Product {
  _id: string
  name: string
  value: number
  stock: number
}

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([])
  const [modalCreateNewProductOpened, setModalCreateNewProductOpened] =
    useState<boolean>(false)
  const [loadingListProducts, setLoadingListProducts] = useState<boolean>(true)
  const [productDataToEdit, setProductDataToEdit] = useState<
    Product | undefined
  >(undefined)

  function getProducts() {
    setLoadingListProducts(true)
    productsService
      .getAll()
      .then((res) => {
        setProducts(res.data.items)
      })
      .catch((error) => {
        console.log('[ERROR]: ', error)
      })
      .finally(() => {
        setLoadingListProducts(false)
      })
  }

  function handleDeleteProduct(idProduct: string) {
    productsService
      .delete(idProduct)
      .then(() => {
        getProducts()
      })
      .catch((err) => {
        console.log('[ERROR]: ', err)
      })
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <ButtonCreateNew
        onPressFunction={() => {
          setModalCreateNewProductOpened(true)
        }}
        textButton="Novo produto"
      />
      {loadingListProducts ? (
        <Loading />
      ) : (
        <FlatList
          data={products}
          ListEmptyComponent={() => (
            <EmptyItems text="Nenhum produto encontrado." />
          )}
          style={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          keyExtractor={(product) => product._id}
          renderItem={({ item }) => {
            return (
              <ListItem
                handleOpenEditModal={setModalCreateNewProductOpened}
                handleDeleteProduct={handleDeleteProduct}
                setProductDataToEdit={setProductDataToEdit}
                item={item}
              />
            )
          }}
        />
      )}

      {modalCreateNewProductOpened && (
        <ModalCreateNewProduct
          productDataToEdit={productDataToEdit}
          setProductDataToEdit={setProductDataToEdit}
          getProducts={getProducts}
          handleClose={setModalCreateNewProductOpened}
        />
      )}
    </>
  )
}
