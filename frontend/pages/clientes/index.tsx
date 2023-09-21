import { Clients } from '../../src/screens/Clients'
import { usersService } from '../../src/services/usersService'
import { PageProps } from '../_app'

export default function ClientsPage({ setTitle }: PageProps) {
  setTitle('Clientes')
  return (
    <>
      <Clients />
    </>
  )
}

export const getServerSideProps = async (context: any) => {
  const hasSession = await usersService.getSession(context)
  if (!hasSession) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    }
  }
}
