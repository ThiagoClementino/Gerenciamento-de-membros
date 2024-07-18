import {  createContext, useState } from "react";
const DataApiOne = createContext("");



export const DeleteDados = ({children}) =>{
const [dadosdeletados, setDadosDeletados] = useState('');

const deleteItens = async () => {
  try {
    const response = await fetch('https://api-gestao-igreja.onrender.com/membros',{
        method: 'DELETE', 
        mode:'cors',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
        }
        
    })
    if(response.ok){
        setDadosDeletados(response)
    }else{
        setDadosDeletados('Erro ao deletar o item');
    }
  } catch (error) {
    setDadosDeletados('Erro ao deletar o item');
    console.error('Error:', error);
    
  }
};

return(
    <DataApiOne.Provider value={{dadosdeletados, deleteItens, setDadosDeletados  }}>
        {children}
    </DataApiOne.Provider>
 );


}


export default DataApiOne;


