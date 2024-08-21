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
  usersService.getSession(context)

  // if (!session) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/login',
  //     },
  //   }
  // }
  // return {
  //   props: {
  //     session,
  //   },
  // }
}
