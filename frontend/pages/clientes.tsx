import { Clients } from '../src/screens/Clients'
import { PageProps } from './_app'

export default function ClientsPage({ setTitle }: PageProps) {
  setTitle('Clientes')
  return (
    <>
      <Clients />
    </>
  )
}
