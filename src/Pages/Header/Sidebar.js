import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import logo from'../../img/iconlogo.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FaUsers } from "react-icons/fa";
import { BsFillClipboard2DataFill } from "react-icons/bs";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  
  const [exibir, setExibir] = useState(false);
  

  return (
    
    
    <nav className={exibir? "NavbarTwo" :"NavbarOne"}>
    
      <aside className="logoAndBtn">
        <img src={logo} alt="logo gestor" className={exibir? "exibirlogo":"ocultarlogo"} />
        <button onClick={()=>setExibir(!exibir)}><FontAwesomeIcon icon={faBarsProgress } size='2xl' style={{color:"#5769fd"}} /></button>
      </aside>
      <ul className='navOptions'>
        <li className='liNav' >
        <Tippy content={<span>Tooltip</span>}>
          <Link to="/" className='NavItem'  >
          <div className='iconSettings' >
            <FontAwesomeIcon icon={faBarsStaggered}/>
            </div>
            <div className={exibir? "exibirTexto":"ocultarTexto" }> 
            <p>Home</p> 
          </div>
        </Link>
        </Tippy>
        </li>
        <li className='liNav' >
          <Link
           to="/membros" className='NavItem'>
          <div className='iconSettings' >
            <FaUsers  className="iconNav"/>
            </div>
            <div className={exibir? "exibirTexto":"ocultarTexto"}> 
            <p>Membros</p> 
          </div>
        </Link>
        </li>
        <li className='liNav' ><Link
         to="/cadastro" className='NavItem'>
          <div className='iconSettings' >
            <BsFillClipboard2DataFill  className="iconNav"/>
            </div>
            <div className={exibir? "exibirTexto":"ocultarTexto"}> 
            <p>Cadastro</p> 
          </div>
        </Link>
        </li>
        <li className='liNav'><Link
         to="/financeiro" className='NavItem'>
          <div className='iconSettings' >
            <RiMoneyDollarCircleFill  className="iconNav"/>
            </div>
            <div className={exibir? "exibirTexto":"ocultarTexto"}> 
            <p>Financeiro</p> 
          </div>
        </Link>
        </li>
   
      </ul>


    </nav>
  
  )
}

export default Header


