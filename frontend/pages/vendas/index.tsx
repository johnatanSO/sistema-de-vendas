import { Sales } from '../../src/components/screens/Sales'
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
