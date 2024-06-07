import express from "express";
import connectDatabase from "./Database/Database.js";
import routes from './routes.js'

const app = express();

app.use(express.json());
app.use(routes);




connectDatabase()
  .then(() => {
    app.listen(3050, () => console.log(`Servidor e Banco de dados rodando no endereço: http://localhost:3050`)
    );
  })
  .catch((erro) => console.log("Banco de dados não conectado", ));


