const express = require ('express');
const app = express ();
const port  = 8080;


app.use(express.json());
require ('./db/models/index');
const users = require("./controllers/users");
app.use('/', users);

app.listen(port, ()=> console.log(`Servidor iniciado com sucesso na porta: http://localhost:${port}`));