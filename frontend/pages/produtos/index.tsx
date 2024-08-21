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
