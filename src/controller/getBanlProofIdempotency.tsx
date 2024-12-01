import axios from "axios";

interface FormData {
  idPagamento: string;
}


export default async function getBanlProofIdempotency({
  idPagamento,
}: FormData) {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const clientID = process.env.NEXT_PUBLIC_CLIENT_ID;
    const authorization = `Bearer ${process.env.NEXT_PUBLIC_SCOOB_AUTHORIZATION}`;
    const numeroContaCorrente = process.env.NEXT_PUBLIC_SCOOB_ACCOUNT_NUMBER;

    if (!baseURL || !clientID || !authorization || !numeroContaCorrente) {
      throw new Error("Variáveis de ambiente não configuradas");
    }
    ////boletos/pagamentos/12345/idempotency/comprovantes
    const url = `${baseURL}/boletos/pagamentos/${idPagamento}/idempotency/comprovantes`;

    const response = await axios.get(url, {
      headers: {
        Authorization: authorization, // Token de autenticação
        client_id: clientID, // ID do cliente
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao obter extrato bancário:", error);
    throw error;
  }
}
