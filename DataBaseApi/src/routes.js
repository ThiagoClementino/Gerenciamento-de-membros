import { Router } from "express";
import { getMembers, postMembers, deleteMembers, putMembers } from "./controllers/UserController.js";

const routes = Router();

routes.get('/membros', getMembers);
routes.post('/membros', postMembers);
routes.delete('/membros/id:', deleteMembers);
routes.put('/membros/:id', putMembers);

export default routes;
