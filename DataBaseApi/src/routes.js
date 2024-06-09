import { Router } from "express";
import { getMembers, postMembers, deleteMembers, putMembers } from "./controllers/UserController.js";
import cors from 'cors'
const routes = Router();

routes.get('/membros', getMembers);
routes.post('/membros', cors(), postMembers);
routes.delete('/membros/:id', deleteMembers);
routes.put('/membros/:id', putMembers);

export default routes;
