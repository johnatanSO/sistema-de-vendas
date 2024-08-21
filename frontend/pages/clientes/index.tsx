import { Clients } from '../../src/components/screens/Clients'
import { usersService } from '../../src/services/usersService'

export default function ClientsPage() {
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
      props: {},
    }
  }
  return {
    props: {},
  }
}
