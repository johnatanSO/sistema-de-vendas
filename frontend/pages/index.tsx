import { Dashboard } from '../src/screens/Dashboard'
import { PageProps } from './_app'

export default function Home({ setTitle }: PageProps) {
  setTitle('Dashboard')
  return (
    <>
      <Dashboard />
    </>
  )
}
