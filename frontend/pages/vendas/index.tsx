import { Sales } from '../../src/components/screens/Sales'
import { usersService } from '../../src/services/usersService'

export default function SalesPage() {
  return (
    <>
      <Sales />
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
