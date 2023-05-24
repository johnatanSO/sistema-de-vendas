import { CreateAccount } from '@/src/screens/CreateAccount'

export default function CreateNewAccountPage() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CreateAccount />
    </div>
  )
}
