import { FilterDate } from '../FilterDate'

interface HeaderPageProps {
  buttonText: string
}

export function HeaderPage({ buttonText }: HeaderPageProps) {
  return (
    <header>
      <FilterDate />
      <button>{buttonText || 'Cadastrar'}</button>
    </header>
  )
}
