import { Dashboard } from '../src/components/screens/Dashboard'
import { usersService } from '../src/services/usersService'

export default function Home() {
  return (
    <>
      <Dashboard />
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
