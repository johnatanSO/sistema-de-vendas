import { Accounts } from '../src/screens/Accounts'
import { PageProps } from './_app'

export default function AccountsPage({ setTitle }: PageProps) {
  setTitle('Contas')
  return (
    <>
      <Accounts />
    </>
  )
}
