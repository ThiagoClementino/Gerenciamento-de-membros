import React from 'react'
import { useContext } from 'react'
import Datainfor from '../../Contexts/DataInfor'
import MembroMinisterio from './MembroMinisterio'

const MembroCadastrado = () => {
    const {dados}=useContext(Datainfor);
    
  return (
    <div>
        
    {
        dados.map(membro => (
            <MembroMinisterio key={membro._id} membro={membro} />
        ))
    }
    </div>
  )
}

export default MembroCadastrado