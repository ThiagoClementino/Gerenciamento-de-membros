const express = require ('express');
const dataFinanceiro = require('./modelfinanceiro')
const mongoose = require ('mongoose');

 
const app = express();
const PORT = 8080;



app.use(express.json());






app.get('/financeiro', async (req, res) => {

  try{
    const finance = await dataFinanceiro.find();
    res.status(201).json(finance);

  } catch(err){
    res.status(500).json({ erro: "Ocorreu um erro ao processar a chamada" });
  }
  
});

app.post('/ ', async (req, res) => {
   try{
     const dataFinanceiro  = req.body;
     const newFinance = await dataFinanceiro
     res.status(201).json(newFinance);

   }catch (error){
     
     res.status(500).json({ erro: "Ocorreu um erro ao processar o lançamento" });
   }
         
   
  });
  
  

  mongoose.connect('mongodb+srv://thidf57:NwNUqHeirjup8qZY@gerenciador-de-membros.ua4raq8.mongodb.net/?retryWrites=true&w=majority&appName=Gerenciador-de-Membros').then(()=>console.log("conectado com sucesso")).catch(()=>console.log("Banco de dados não conectado"));
    



app.listen(PORT, () => console.log(`Servidor rodando no endereço: http://localhost:${PORT}`))
