import { Accounts } from '../src/screens/Accounts'
import { usersService } from '../src/services/usersService'
import { PageProps } from './_app'

export default function AccountsPage({ setTitle }: PageProps) {
  setTitle('Contas')
  return (
    <>
      <Accounts />
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
