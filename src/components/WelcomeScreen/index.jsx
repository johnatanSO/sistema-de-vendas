import React,{useEffect, useContext} from 'react'
import './styles.scss'
import { userDataContext } from '../../userDataContext'

export function WelcomeScreen() {
  const {setSectionActive} = useContext(userDataContext)
  useEffect(() => {
    localStorage.removeItem('sectionActive')
    setSectionActive('')
  },[])
  return (
    <div className="welcomeScreen">
      <h1>Bem vindo ao sistema de gestão de comércio.</h1>
    </div>
  )
}