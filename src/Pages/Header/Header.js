
import { Link } from 'react-router-dom';
import { IoIosSettings } from "react-icons/io";
import iconlogo from '../../img/iconlogo.png'
import './header.css'
import { GoHomeFill } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { MdDataset } from "react-icons/md";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";














const Header = () => {
   
  

    
  return (
    
    <nav className='NavHeader'>
     
     <div className='logo'>
       <img src={iconlogo}/>    
         </div>
    <div className='containerHeader' defaultActiveKey="/home" >
        <li className='linknav' >
            <Link to="/" >
            <div className='iconnav'>
                <GoHomeFill size={25}  />
            </div> 
            <p className='optionMenu'> 
            Home</p> 
            </Link>
        </li>
        <li className='linknav' >
            <Link to="/membros" >
                <div className='iconnav'>
                <FaUsers size={25} />
                </div>  
                <p className='optionMenu'  >
                Membros 
                </p>  
            </Link>
        </li>
        <li className='linknav'>
            <Link to="/cadastro" >
            <div className='iconnav'>
             <MdDataset size={25}/>
            </div>
            <p className='optionMenu' >
            Cadastro
            </p>
            </Link>
        </li>
        <li className='linknav'>
            <Link to="/financeiro" >
            <div className='iconnav'>
                <LiaMoneyCheckAltSolid  size={25} />
            </div> 
            <p className='optionMenu' >
            Financeiro
            </p>
            </Link>
        </li>
    
    </div>
    <div className='settings'>
    <Link to="/"> 
    <IoIosSettings size={30}/>
    <p className='optionMenu'> 
 Settings</p></Link>
    </div>
  
    </nav>
  )
}

export default Header
