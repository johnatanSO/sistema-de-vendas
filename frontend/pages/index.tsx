import { Dashboard } from '../src/screens/Dashboard'
import { usersService } from '../src/services/usersService'
import { PageProps } from './_app'

export default function Home({ setTitle }: PageProps) {
  setTitle('Dashboard')
  return (
    <>
      <Dashboard />
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
