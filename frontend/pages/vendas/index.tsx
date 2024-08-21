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
