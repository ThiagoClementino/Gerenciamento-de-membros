
import members from "../models/members.js";

/* ------------------------------------------- */

async function getMembers(req, res) {
  const Newmembers = await members.find();
  return res.status(200).json(Newmembers);
}
/* ------------------------------------------- */

async function postMembers(req, res) {
  try {
    const NovoMembro = new members(req.body);
    await NovoMembro.save();
    res.status(201).json(NovoMembro);
  } catch (erro) {
    res
      .status(500)
      .json({ erro: "Dados não lançados", mongo: erro.message });
    console.error(erro);
  }
}

/* ------------------------------------------- */
async function deleteMembers(req, res) {
    try {
      const { id } = req.params;
      await members.findByIdAndRemove(id);
      res.status(200).send("Membro deletado");
    } catch (erro) {
      res.status(500).json({ erro: "Não foi possível excluir os dados" });
      console.log(erro);
    }
  }
  
  

/*-----------------------------------------------*/

async function putMembers(req, res) {
  try {
    const id = req.params.id;
    await members.findByIdAndUpdate({ __id: id });
    res.send("Dados deletados");
  } catch (erro) {
    res
      .status(500)
      .json({ erro: "Não foi possível excluir os dados" });
    console.log(erro);
  }
}

export { getMembers, postMembers, deleteMembers, putMembers };
