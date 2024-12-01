import axios from "axios";

interface FormData {
    mes: string
    ano: string
    dataInicial: string
    dataFinal: string
    agruparCNAB: string
}

export default async function GetBankStatement({mes, ano, dataFinal, dataInicial, agruparCNAB}:FormData){
    try{
        const baseURLAccount = process.env.NEXT_PUBLIC_BASE_URL_ACCOUNT;
        const clientID = process.env.NEXT_PUBLIC_CLIENT_ID;
        const authorization = `Bearer ${process.env.NEXT_PUBLIC_SCOOB_AUTHORIZATION}`
        const numeroContaCorrente = process.env.NEXT_PUBLIC_SCOOB_ACCOUNT_NUMBER

    if (!baseURLAccount || !clientID) {
        throw new Error("Variáveis de ambiente não configuradas");
      }

       // Montar os parâmetros da URL
    const url = `${baseURLAccount}/extrato/${mes}/${ano}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: authorization,
        client_id: clientID,
      },
      params: {
        diaInicial: dataInicial,
        diaFinal: dataFinal,
        agruparCNAB: agruparCNAB,
        numeroContaCorrente: numeroContaCorrente,
      },
    });

    // Retornar os dados
    return response.data;
  } catch (error) {
    console.error("Erro ao obter extrato bancário:", error);
    throw error;
  }
}