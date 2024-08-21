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
  usersService.getToken(context)

  // if (!token) {
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

  return {
    props: {},
  }
}
