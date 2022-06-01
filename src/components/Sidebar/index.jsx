import React, { useContext,useEffect} from 'react'
import './styles.scss'
import {Buildings, SignOut, Note, UsersThree, ShoppingCart} from 'phosphor-react'
import LogoImg from '../../assets/Logo.png'
import {Link} from 'react-router-dom'
import {userDataContext} from '../../userDataContext'

export function Sidebar() {
  const {setToken, sectionActive, setSectionActive} = useContext(userDataContext)

  function logout(){
    setToken('')
    localStorage.removeItem('token')
  }
  
  useEffect(() =>{
    localStorage.setItem('sectionActive', sectionActive)
  },[sectionActive])
  
  return (
    <aside>
      <Link className="link-logo" to={'/'}><img className="logo" src={LogoImg} alt="Logo da página" /></Link>
      <div className={"menu"}>

        <Link className="link" to="/company"><button onClick={()=>setSectionActive('company')} className={sectionActive === 'company' ? 'menu-item active' : 'menu-item'}><Buildings className="company-icon icon" size={20} /> Empresas</button></Link>
        
        <Link className="link" to="products"><button onClick={()=>setSectionActive('products')} className={sectionActive === 'products' ? 'menu-item active' : 'menu-item'}><ShoppingCart className="products-icon icon" size={20} /> Produtos</button></Link>

        <Link className="link" to="/clients"><button onClick={()=>setSectionActive('clients')} className={sectionActive === 'clients' ? 'menu-item active' : 'menu-item'}><UsersThree className="clients-icon icon" size={20} /> Clientes</button></Link>

        <Link className="link" to="/orders"><button onClick={()=>setSectionActive('orders')} className={sectionActive === 'orders' ? 'menu-item active' : 'menu-item'}><Note className="orders-icon icon" size={20} /> Pedidos</button></Link>

      </div>
      <Link to="/"><button onClick={logout} className="logout"><SignOut className="icon" size={20} />Logout</button></Link>
    </aside>
  )
}