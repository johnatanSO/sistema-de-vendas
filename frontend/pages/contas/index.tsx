import { Accounts } from '../../src/components/screens/Accounts'
import { usersService } from '../../src/services/usersService'

export default function AccountsPage() {
  return (
    <>
      <Accounts />
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
