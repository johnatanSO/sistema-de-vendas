import { Products } from '../src/screens/Products'
import { PageProps } from './_app'

export default function ProductsPage({ setTitle }: PageProps) {
  setTitle('Produtos')
  return (
    <>
      <Products />
    </>
  )
}
