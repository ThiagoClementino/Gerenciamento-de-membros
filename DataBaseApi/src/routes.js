import { Router } from "express";
import { getMembers, postMembers, deleteMembers, putMembers, getfinance, postfinance, deletefinance, putfinance  } from "./controllers/UserController.js";
import cors from 'cors'
const routes = Router();

routes.get('/membros', getMembers);
routes.post('/membros', cors(), postMembers);
routes.delete('/membros/:id', deleteMembers);
routes.put('/membros/:id', putMembers);



routes.get('/finance', getfinance);
routes.post('/finance', cors(), postfinance);
routes.delete('/finance/:id', deletefinance);
routes.put('/finance/:id', putfinance);

export default routes;
