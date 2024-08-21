import { Products } from '../../src/components/screens/Products'
import { usersService } from '../../src/services/usersService'

export default function ProductsPage() {
  return (
    <>
      <Products />
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
