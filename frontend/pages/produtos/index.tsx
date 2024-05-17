import { Products } from '../../src/components/screens/Products'
import { usersService } from '../../src/services/usersService'
import { PageProps } from '../_app'

export default function ProductsPage({ setTitle }: PageProps) {
  setTitle('Produtos')
  return (
    <>
      <Products />
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
