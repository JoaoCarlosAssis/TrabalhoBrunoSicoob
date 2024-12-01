import GetBankCollection from "@/controller/getBankCollection";
import FormatDate from "@/utils/dataFormat";
import { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  codigoBarras: string;
  dataPagamento: string;
}

interface ConsultaBoletoResponse {
  resultado: {
    numeroInstituicaoEmissora: number;
    nomeInstituicaoEmissora: string;
    tipoPessoaBeneficiario: string;
    numeroCpfCnpjBeneficiario: string;
    nomeRazaoSocialBeneficiario: string;
    nomeFantasiaBeneficiario: string;
    tipoPessoaBeneficiarioFinal: string;
    numeroCpfCnpjBeneficiarioFinal: string;
    nomeRazaoSocialBeneficiarioFinal: string;
    nomeFantasiaBeneficiarioFinal: string;
    tipoPessoaPagador: string;
    numeroCpfCnpjPagador: string;
    nomeRazaoSocialPagador: string;
    nomeFantasiaPagador: string;
    codigoBarras: string;
    numeroLinhaDigitavel: string;
    dataVencimentoBoleto: string; // ISO date format (yyyy-MM-dd)
    dataLimitePagamentoBoleto: string; // ISO date format (yyyy-MM-dd)
    valorBoleto: number;
    valorAbatimentoDesconto: number;
    valorMultaMora: number;
    valorPagamento: number;
    dataPagamento: string; // ISO date format (yyyy-MM-dd)
    permiteAlterarValor: boolean;
    consultaEmContingencia: boolean;
    codigoEspecieDocumento: number;
    codigoSituacaoBoletoPagamento: string;
    nossoNumero: string;
    numeroDocumento: string;
    identificadorConsulta: string;
    descricaoInstrucaoDesconto1?: string;
    descricaoInstrucaoDesconto2?: string;
    descricaoInstrucaoDesconto3?: string;
    descricaoInstrucaoValorMinMax?: string;
    bloquearPagamento: boolean;
    mensagemBloqueioPagamento: string;
  };
}

export function BankColletcion() {
  const [formData, setFormData] = useState<FormData>({
    codigoBarras: "",
    dataPagamento: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseData, setResponseData] = useState<ConsultaBoletoResponse>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataFormat = formData.dataPagamento
      ? FormatDate(formData.dataPagamento)
      : "";

    const formattedData: {
      dataPagamento: string;
      codigoBarras: string;
    } = {
      ...formData,
      dataPagamento: dataFormat ? dataFormat : "",
    };
    try {
      const response = await GetBankCollection(formattedData);
      setResponseData(response);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar dados do boleto!", error);
    } finally {
      console.log(responseData);
    }
  };

  return (
    <div className="bg-[#0B3D48] rounded-md p-6">
      <div>
        <span>Buscar boleto</span>
        <div>
          <form onSubmit={handlesubmit}>
            <div className="flex flex-wrap gap-4">
              <label className="flex flex-col w-full sm:w-auto">
                Código de barras
                <input
                  type="text"
                  name="codigoBarras"
                  value={formData.codigoBarras}
                  onChange={handleChange}
                  className="border rounded p-2 text-gray-700"
                  required
                />
              </label>

              <label className="flex flex-col w-full sm:w-auto">
                <span className="flex items-center gap-2">Data pagamento</span>
                <input
                  type="date"
                  name="dataPagamento"
                  value={formData.dataPagamento}
                  onChange={handleChange}
                  className="border rounded p-2 text-gray-700"
                  required
                />
              </label>
            </div>
            <div className="">
              <button
                type="submit"
                className=" bg-green-700 p-4 rounded-md text-white font-bold px-6 mt-4 hover:bg-green-800"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#0B3D48] p-5 rounded-lg w-1/2 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white">Boleto Bancário</h2>

            <h3 className="mt-6 text-lg font-semibold text-white">
              Dados do boleto
            </h3>
            <div className="mt-4">
              <span>
                {isModalOpen && (
                  <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#0B3D48] p-5 rounded-lg w-1/2 max-h-[80vh] overflow-y-auto">
                      <h2 className="text-2xl font-bold text-white">
                        Boleto Bancário
                      </h2>

                      <h3 className="mt-6 text-lg font-semibold text-white">
                        Dados do boleto
                      </h3>
                      <div className="mt-4 text-white space-y-3">
                        <p>
                          <strong>Instituição Emissora:</strong>{" "}
                          {responseData?.resultado.nomeInstituicaoEmissora}(
                          {responseData?.resultado.numeroInstituicaoEmissora})
                        </p>
                        <p>
                          <strong>Beneficiário:</strong>{" "}
                          {responseData?.resultado.nomeRazaoSocialBeneficiario}(
                          {responseData?.resultado.numeroCpfCnpjBeneficiario})
                        </p>
                        <p>
                          <strong>Valor:</strong> R${" "}
                          {responseData?.resultado.valorBoleto.toFixed(2)}
                        </p>

                        <p>
                          <strong>Linha Digitável:</strong>{" "}
                          {responseData?.resultado.numeroLinhaDigitavel}
                        </p>
                        <p>
                          <strong>Código de Barras:</strong>{" "}
                          {responseData?.resultado.codigoBarras}
                        </p>

                        {responseData?.resultado.bloquearPagamento && (
                          <div className="text-red-500">
                            <strong>Pagamento Bloqueado:</strong>{" "}
                            {responseData?.resultado.mensagemBloqueioPagamento}
                          </div>
                        )}
                      </div>

                      <div className="w-full flex justify-end mt-4">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="bg-green-700 px-5 py-2 rounded-md text-white font-bold hover:bg-green-800 transition"
                        >
                          Fechar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </span>
            </div>

            <div className="w-full flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-green-700 px-5 py-2 rounded-md text-white font-bold hover:bg-green-800 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
