import { Dashboard } from '@/src/screens/Dashboard'

export default function HomePage() {
  return (
    <>
      <Dashboard />
    </>
  )
}
export async function getServerSideProps() {
  return {
    props: {},
    redirect: {
      permanent: false,
      destination: '/login',
    },
  }
}
