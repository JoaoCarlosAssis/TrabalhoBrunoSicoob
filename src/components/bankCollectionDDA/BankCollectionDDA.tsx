import GetBankCollectionDDA from "@/controller/getBankCollectionDDA";
import FormatDate from "@/utils/dataFormat";
import { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  dataInicial: string;
  dataFinal: string;
  dataPagamento: string;
  situacao: string;
  tipoData: string;
}

interface BoletoData {
  descricaoTipoPagador: string;
  tipoPessoaBeneficiario: string;
  numeroCpfCnpjBeneficiario: string;
  nomeRazaoSocialBeneficiario: string;
  tipoPessoaPagador: string;
  numeroCpfCnpjPagador: string;
  nomeRazaoSocialPagador: string;
  nomeFantasiaPagador: string;
  descricaoLogradouroPagador: string;
  descricaoCidadePagador: string;
  siglaUfPagador: string;
  numeroCepPagador: string;
  tipoPessoaAvalista: string;
  numeroCpfCnpjAvalista: string;
  nomeAvalista: string;
  valorBoleto: number;
  dataVencimentoBoleto: string;
  codigoTipoSituacaoBoleto: number;
  descricaoSituacaoBoleto: string;
  numeroIdentificadorBoletoCip: number;
  numeroCodigoBarras: string;
  numeroCpfCnpjPagadorEletronico: string;
  aceite: boolean;
  numeroNossoNumero: string;
  numeroDocumento: string;
  dataPagamento: string;
  valorPagamento: number;
  codigoEspecieDocumento: number;
  dataEmissao: string;
  dataLimitePagamento: string;
  codigoTipoJuros: number;
  dataJuros: string;
  valorPercentualJuros: number;
  codigoTipoMulta: number;
  dataMulta: string;
  valorPercentualMulta: number;
  valorAbatimento: number;
  codigoTipoDesconto1: string;
  dataDesconto1: string;
  valorPercentualDesconto1: number;
  codigoTipoDesconto2: string;
  dataDesconto2: string;
  valorPercentualDesconto2: number;
  codigoTipoDesconto3: string;
  dataDesconto3: string;
  valorPercentualDesconto3: number;
  numeroDiasProtesto: number;
  quantidadePagamentoParcial: number;
  codigoAutorizacaoValorDivergente: number;
  codigoIndicadorValorMaximo: string;
  valorPercentualMaximo: number;
  codigoIndicadorValorMinimo: string;
  valorPercentualMinimo: number;
}

export function BankCollectionDDA() {
  const [formData, setFormData] = useState<FormData>({
    dataInicial: "",
    dataFinal: "",
    dataPagamento: "",
    situacao: "",
    tipoData: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseData, setResponseData] = useState<BoletoData[]>();

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

    const formattedData: {
      dataInicial: string;
      dataFinal: string;
      dataPagamento: string;
      situacao: string;
      tipoData: string;
    } = {
      ...formData,
      dataPagamento: FormatDate(formData.dataPagamento)
        ? formData.dataPagamento
        : "",
      dataFinal: FormatDate(formData.dataFinal) ? formData.dataFinal : "",
      dataInicial: FormatDate(formData.dataInicial) ? formData.dataInicial : "",
    };
    try {
      const response = await GetBankCollectionDDA(formattedData);
      setResponseData(response);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar dados do boleto!", error);
    }
  };

  return (
    <div className="bg-[#0B3D48] max-w-[50%] rounded-md p-6">
      <div>
        <span>Buscar boleto</span>
        <div>
          <form onSubmit={handlesubmit}>
            <div className="flex flex-wrap gap-4">
              <label className="flex flex-col w-full sm:w-auto">
                Data Inicial
                <input
                  type="date"
                  name="dataInicial"
                  value={formData.dataInicial}
                  onChange={handleChange}
                  className="border rounded p-2 text-gray-700"
                  required
                />
              </label>

              <label className="flex flex-col w-full sm:w-auto">
                <span className="flex items-center gap-2">Data Final</span>
                <input
                  type="date"
                  name="dataFinal"
                  value={formData.dataFinal}
                  onChange={handleChange}
                  className="border rounded p-2 text-gray-700"
                  required
                />
              </label>
              <label className="flex flex-col w-full sm:w-auto">
                <span className="flex items-center gap-2">Data Pagamento</span>
                <input
                  type="date"
                  name="dataPagamento"
                  value={formData.dataPagamento}
                  onChange={handleChange}
                  className="border rounded p-2 text-gray-700"
                  required
                />
              </label>
              <label className="flex flex-col w-full sm:w-auto">
                <span className="flex items-center gap-2">Situação</span>
                <select
                  name="situacao"
                  value={formData.situacao}
                  onChange={handleChange}
                  className="border rounded p-2 text-gray-700"
                  required
                >
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  <option value="1">Em aberto</option>
                  <option value="2">Agendado</option>
                  <option value="3">Liquidado</option>
                  <option value="4">Baixado</option>
                </select>
              </label>
              <label className="flex flex-col w-full sm:w-auto">
                <span className="flex items-center gap-2">Tipo Data</span>
                <select
                  name="tipoData"
                  value={formData.tipoData}
                  onChange={handleChange}
                  className="border rounded p-2 text-gray-700"
                  required
                >
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  <option value="1">Data de vencimento</option>
                  <option value="2">Data de emissão</option>
                  <option value="3">Data de inclusão</option>
                </select>
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
            <h2 className="text-2xl font-bold text-white">DDA</h2>


            <h3 className="mt-6 text-lg font-semibold text-white">Boleto</h3>
            {responseData?.map((item: BoletoData, index: number) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-3 mb-3 text-white"
              >
                <p>
                  <span className="font-bold">Tipo Pagador:</span>{" "}
                  {item.descricaoTipoPagador}
                </p>
                <p>
                  <span className="font-bold">Beneficiario:</span>{" "}
                  {item.nomeRazaoSocialBeneficiario}
                </p>
                <p>
                  <span className="font-bold">CPF/CNPJ Pagador:</span>{" "}
                  {item.numeroCpfCnpjPagador}
                </p>
                <p>
                  <span className="font-bold">Razão Social Pagador:</span>{" "}
                  {item.nomeRazaoSocialPagador}
                </p>
                <p>
                  <span className="font-bold">Nome Fantasia Pagador:</span>{" "}
                  {item.nomeFantasiaPagador}
                </p>
                <p>
                  <span className="font-bold">UF Pagador:</span>{" "}
                  {item.siglaUfPagador}
                </p>
                <p>
                  <span className="font-bold">Valor Boleto:</span>{" "}
                  {item.valorBoleto}
                </p>
                <p>
                  <span className="font-bold">Data Vencimento:</span>{" "}
                  {item.dataVencimentoBoleto}
                </p>
                <p>
                  <span className="font-bold">Data Pagamento:</span>{" "}
                  {item.dataPagamento}
                </p>
              </div>
            ))}

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
