import { Sales } from '../../src/components/screens/Sales'
import { usersService } from '../../src/services/usersService'

export default function SalesPage() {
  return (
    <>
      <Sales />
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
