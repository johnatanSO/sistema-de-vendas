import { Dashboard } from '../src/components/screens/Dashboard'
import { usersService } from '../src/services/usersService'

export default function Home() {
  return (
    <>
      <Dashboard />
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
      props: {},
    }
  }
  return {
    props: { session },
  }
}
