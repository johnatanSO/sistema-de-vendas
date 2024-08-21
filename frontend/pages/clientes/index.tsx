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
  const session = await usersService.getSession(context)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    }
  }
  return {
    props: {
      session,
    },
  }
}
