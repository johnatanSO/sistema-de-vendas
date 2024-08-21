import { Products } from '../../src/components/screens/Products'
import { usersService } from '../../src/services/usersService'

export default function ProductsPage() {
  return (
    <>
      <Products />
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
