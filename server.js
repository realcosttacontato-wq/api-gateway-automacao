import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "online",
    mensagem: "API Gateway funcionando"
  });
});

app.post("/api/teste", async (req, res) => {

  try {

    const dados = req.body;

    console.log("Dados recebidos:", dados);

    const resposta = await fetch("https://thalisson.app.n8n.cloud/webhook/e51ac874-cc53-42cc-b0a4-48f9dca9b45a", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    const retorno = await resposta.text();

    res.json({
      sucesso: true,
      automacao: true,
      respostaN8N: retorno
    });

  } catch (erro) {

    console.log(erro);

    res.status(500).json({
      erro: true,
      mensagem: "Erro interno"
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});