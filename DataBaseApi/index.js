
// import lancamentoFinanceiro from './src/models/financeiro.js';
import User from './src/models/users.js'
import mongoose from 'mongoose';
import express from 'express'

 
const app = express();

const userid = [
  {	
    "name":"Thiago Clementino",
    "email":"thiagoclementino@email.com",
    "senha":"nova427"
    } ]


app.use(express.json());


app.get('/', (req, res)=>{
  res.json(userid);
})

app.get('/user', async (req, res) => {

  try{
    
    const NewUsers = await User.find();
    res.status(201).json(NewUsers);

  } catch(err){
    res.status(500).json({ erro: "Ocorreu um erro ao processar a chamada" });
  }
  
});

app.post('/user ', async (req, res) => {
  try{
     const User  = req.body
     const Users = User.create(User)
     return res.json(Users)
  } catch(erro){
    res.status(500).json({ erro: "Ocorreu um erro ao processar o usuario" });

  }
     

  
         
   
  });
  
  

  mongoose.connect('mongodb+srv://thidf57:NwNUqHeirjup8qZY@Gerenciador-de-Membros.ua4raq8.mongodb.net/?retryWrites=true&w=majority&appName=Gerenciador-de-Membros').then(()=>console.log("conectado com sucesso")).catch(()=>console.log("Banco de dados não conectado"));
    



app.listen(3001, () => console.log(`Servidor rodando no endereço: http://localhost:3001`))
