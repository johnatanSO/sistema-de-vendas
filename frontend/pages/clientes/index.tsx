import { Clients } from '../../src/components/screens/Clients'
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

export const getServerSideProps = (context: any) => {
  const hasSession = usersService.getSession(context)
  if (!hasSession) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }
  return {
    props: {},
  }
}
