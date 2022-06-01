import {useState, createContext} from 'react';
export const userDataContext = createContext()


export function UserDataContextProvider({children}){
  const [sectionActive, setSectionActive] = useState(localStorage.getItem('sectionActive') || '')
  const [name, setName] = useState('')
  const [token, setToken] = useState('')
  const [companiesList, setCompaniesList] = useState([]);
  const [clientsList, setClientsList] = useState([]);
  const [productsList, setProductsList] = useState([]);


  return(
    <userDataContext.Provider value={{
      setName,
      name,
      token,
      setToken,
      companiesList,
      setCompaniesList,
      clientsList,
      setClientsList,
      productsList,
      setProductsList,
      sectionActive,
      setSectionActive
    }}>
      {children}
    </userDataContext.Provider>
  )
} 