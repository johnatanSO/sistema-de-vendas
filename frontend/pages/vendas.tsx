import { Sales } from '../src/screens/Sales'
import { PageProps } from './_app'

export default function SalesPage({ setTitle }: PageProps) {
  setTitle('Vendas')
  return (
    <>
      <Sales />
    </>
  )
}
