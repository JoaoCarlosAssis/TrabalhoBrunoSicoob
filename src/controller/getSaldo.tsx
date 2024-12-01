import axios from "axios";

interface SaldoResponse {
  saldo: number;
  saldoLimite: number;
  saldoBloqueado: number;
}
export default async function getSaldo(
    numeroContaCorrent: number
  ): Promise<SaldoResponse | null> {
    try {
      const baseURLAccount = process.env.NEXT_PUBLIC_BASE_URL_ACCOUNT;
      const clientID = process.env.NEXT_PUBLIC_CLIENT_ID;
      const authorization = `Bearer ${process.env.NEXT_PUBLIC_SCOOB_AUTHORIZATION}`

      if (!baseURLAccount || !clientID) {
        throw new Error("Variáveis de ambiente não configuradas");
      }
      //Request API
      const response = await axios.get<SaldoResponse>(
        `${baseURLAccount}/saldo`,
        {
          headers: {
            client_id: clientID,
            Authorization: authorization
          },
          params: {
            numeroContaCorrent,
          },
        }
      );

      return response.data;
    } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao buscar saldo:", error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error("Erro ao buscar saldo:", error.message);
    } else {
      console.error("Erro desconhecido:", error);
    }
    return null;
    }
  }