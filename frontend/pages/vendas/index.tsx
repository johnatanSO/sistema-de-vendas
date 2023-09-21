import { Sales } from '../../src/screens/Sales'
import { usersService } from '../../src/services/usersService'
import { PageProps } from '../_app'

export default function SalesPage({ setTitle }: PageProps) {
  setTitle('Vendas')
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
