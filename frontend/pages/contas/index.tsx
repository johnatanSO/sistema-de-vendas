import { Accounts } from '../../src/components/screens/Accounts'
import { usersService } from '../../src/services/usersService'

export default function AccountsPage() {
  return (
    <>
      <Accounts />
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
