import { usersService } from '../../src/services/usersService'

export default function NotFoundPage() {
  return (
    <>
      <h1>Página não encontrada</h1>
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
    }
  }
}
