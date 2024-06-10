
import members from "../models/members.js";
import financeiro from "../models/financeiro.js";

/* ------------------------------------------- */

async function getMembers(req, res) {
  const Newmembers = await members.find();
  return res.status(200).json(Newmembers);
}
/* ------------------------------------------- */

async function postMembers(req, res) {
  console.log(req.body)
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
      await members.findByIdAndDelete(id);
      res.status(200).send("Membro deletado");
    } catch (erro) {
      res.status(500).json({ erro: "Não foi possível excluir os dados" });
      console.log(erro);
    }
  }
  
  

/*-----------------------------------------------*/

async function putMembers(req, res) {
  try {
    const { id } = req.params;
    await members.findByIdAndUpdate({ id });
    res.send("Dados deletados");
  } catch (erro) {
    res
      .status(500)
      .json({ erro: "Não foi possível excluir os dados" });
    console.log(erro);
  }
}





/*----------------------------------------------------------*/
/*----------------------------------------------------------*/
/*----------------------------------------------------------*/



async function getfinance(req, res) {
  const NewLancamento = await financeiro.find();
  return res.status(200).json(NewLancamento);
}
/* ------------------------------------------- */

async function postfinance(req, res) {
  console.log(req.body)
  try {
    const Novolancamento = new financeiro(req.body);
    await Novolancamento.save();
    res.status(201).json(Novolancamento);
  } catch (erro) {
    res
      .status(500)
      .json({ erro: "Dados não lançados", mongo: erro.message });
    console.error(erro);
  }
}

/* ------------------------------------------- */
async function deletefinance(req, res) {
    try {
      const { id } = req.params;
      await financeiro.findByIdAndDelete(id);
      res.status(200).send("Membro deletado");
    } catch (erro) {
      res.status(500).json({ erro: "Não foi possível excluir os dados" });
      console.log(erro);
    }
  }
  
  

/*-----------------------------------------------*/

async function putfinance(req, res) {
  try {
    const { id } = req.params;
    await financeiro.findByIdAndUpdate({ id });
    res.send("Dados deletados");
  } catch (erro) {
    res
      .status(500)
      .json({ erro: "Não foi possível excluir os dados" });
    console.log(erro);
  }
}

export { getMembers, postMembers, deleteMembers, putMembers, getfinance, postfinance, deletefinance, putfinance };
