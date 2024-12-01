import axios from "axios";

interface FormData {
  dataInicial: string,
  dataFinal: string,
  dataPagamento: string,
  situacao: string,
  tipoData: string
}


export default async function GetBankCollectionDDA({
  dataInicial,
  dataFinal,
  situacao,
  tipoData

}: FormData) {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const clientID = process.env.NEXT_PUBLIC_CLIENT_ID;
    const authorization = `Bearer ${process.env.NEXT_PUBLIC_SCOOB_AUTHORIZATION}`;
    const numeroContaCorrente = process.env.NEXT_PUBLIC_SCOOB_ACCOUNT_NUMBER;

    if (!baseURL || !clientID || !authorization || !numeroContaCorrente) {
      throw new Error("Variáveis de ambiente não configuradas");
    }
    ///boletos?numeroConta=57390010&dataInicial=2024-11-01&dataFinal=2024-11-30&situacao=1&tipoData=1
    const url = `${baseURL}/boletos?numeroConta=${numeroContaCorrente}&dataInicial=${dataInicial}&dataFinal=${dataFinal}&situacao=${situacao}&tipoData=${tipoData}`;

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
