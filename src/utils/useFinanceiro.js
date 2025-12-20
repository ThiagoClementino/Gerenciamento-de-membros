import { useState, useEffect } from "react";

const useFinanceiro = () => {
  const [dadosfinance, setDadosfinance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinanceiro = async () => {
      try {
        const response = await fetch(
          "https://api-gestao-igreja-jcod.vercel.app/finance",
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro na resposta da rede: " + response.statusText);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setDadosfinance(data);
        } else {
          console.error("Dados da API de finanças não é um array");
          setDadosfinance([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFinanceiro();
  }, []);

  // Retorna os dados, o estado de carregamento, o erro E a função de atualização
  return { dadosfinance, setDadosfinance, isLoading, error };
};

export default useFinanceiro;
