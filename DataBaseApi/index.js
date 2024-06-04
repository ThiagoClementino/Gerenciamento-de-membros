const express = require('express');
const app = express();
const PORT = 8080;
// Importação correta do ModelFinanceiro
// ...

app.use(express.json());

const lancamento = [
  {
    "id": 5,
    "valor": 250,
    "statuspagamento": "nao pago",
    "datapagamento": "15/04/2024",
    "tipolancamento": "agua",
    "comprovante": "pago loterica",
    "observacao": "teste"
  },
  {
    "id": 6,
    "valor": 350,
    "statuspagamento": "pago",
    "datapagamento": "15/04/2024",
    "tipolancamento": "internet",
    "comprovante": "pago app",
    "observacao": "teste app"
  }
];

app.get('/financeiro', async (req, res) => {
  await res.send(lancamento);
});

app.post('/financeiro', async (req, res) => {
  lancamento.push(req.body);
  await res.status(201).send({ mensagem: "Lançamento realizado com sucesso" }).json(lancamento);
});

app.put('/financeiro/:id', (req, res) => {
  const { id } = req.params;
  const { valor, statuspagamento, datapagamento, tipolancamento, comprovante, observacao } = req.body;

  const novoLancamento = {
    valor,
    statuspagamento,
    datapagamento,
    tipolancamento,
    comprovante,
    observacao,
  };

  const lancamentoAtualizado = lancamento.reduce((acc, lancamento) => {
    if (lancamento.id === parseInt(id)) {
      return { ...lancamento, ...novoLancamento }; // Atualizar dados do lançamento encontrado
    } else {
      return acc;
    }
  }, {});

  if (!lancamentoAtualizado) {
    res.status(404).send({ mensagem: "Lançamento não encontrado" });
    return;
  }

  const indiceLancamento = lancamento.findIndex(l => l.id === parseInt(id));
  lancamento[indiceLancamento] = lancamentoAtualizado;

  res.status(200).send({ mensagem: "Lançamento atualizado com sucesso" });
});
app.delete('/financeiro/:id', (req, res)=>{
   const {id} = req.params.id;
   lancamento.splice(id, 1);
   res.send("Exclusão realizada com sucesso")


})
    

app.listen(PORT, () => console.log(`Servidor rodando no endereço: http://localhost:${PORT}`));
