import { Suppliers } from '../../src/components/screens/Suppliers'
import { usersService } from '../../src/services/usersService'

export default function SuppliersPage() {
  return (
    <>
      <Suppliers />
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
