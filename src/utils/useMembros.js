import { useState, useEffect } from "react";

const useMembros = () => {
  const [dadosMembros, setDadosMembros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembros = async () => {
      try {
        const response = await fetch(
          "https://api-gestao-igreja-jcod.vercel.app/membros",
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
          setDadosMembros(data);
        } else {
          console.error("Dados da API não é um array");
          setDadosMembros([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembros();
  }, []);

  return { dadosMembros, isLoading, error };
};

export default useMembros;
