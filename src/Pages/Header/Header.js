import React from 'react'
import { Link } from 'react-router-dom';
import './header.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
// import { faAddressCard, faMoneyCheckDollar, faUsers } from '@fortawesome/free-solid-svg-icons';








const Header = () => {
  return (
    <div className='Header'>
        <div className='logo'><h3>Gestão de Membros</h3></div>
    <nav className='navHeader' defaultActiveKey="/home" >
        <li className='' >
            <Link to="/" > <p className='optionMenu'> Home</p> </Link>
            </li>
        <li className='' >
            <Link to="/membros" className=''><p className='optionMenu'  >  Membros </p></Link>
        </li>
        <li className=''>
            <Link to="/cadastro" className=''> <p className='optionMenu' > Cadastro</p></Link>
        </li>
        <li className=''>
            <Link to="/financeiro" className=''> <p className='optionMenu' > Financeiro</p></Link>
        </li>
    
    </nav>
    <div className='settings'>
    <Link to="/"> <p className='optionMenu'>Settings</p></Link>
    </div>
    
    </div>
  )
}

export default Header
