import { usersService } from '@/services/usersService'
import { Dashboard } from '../src/components/screens/Dashboard'

export default function Home() {
  return (
    <>
      <Dashboard />
    </>
  )
}

export const getServerSideProps = (context: any) => {
  const session = usersService.getSession(context)

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
