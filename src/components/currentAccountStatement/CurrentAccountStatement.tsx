import GetBankStatement from "@/controller/getBankStatement";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  mes: string;
  ano: string;
  dataInicial: string;
  dataFinal: string;
  agruparCNAB: string;
}

interface Transacao {
  dataLote: string;
  tipo: string;
  descInfComplementar: string;
  cpfCnpj: string;
  data: string;
  numeroDocumento: string;
  descricao: string;
  valor: string;
}

interface ResponseData {
  saldoAnterior: string;
  saldoAtual: string;
  saldoBloqueado: string;
  saldoBloqueioJudicial: string;
  saldoBloqueioJudicialAnterior: string;
  saldoLimite: string;
  transacoes: Transacao[];
}

export function CurrentAccountStatement() {
  const [formData, setFormData] = useState<FormData>({
    mes: "",
    ano: "",
    dataInicial: "",
    dataFinal: "",
    agruparCNAB: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseData, setResponseData] = useState<ResponseData>({
    saldoAnterior: "",
    saldoAtual: "",
    saldoBloqueado: "",
    saldoBloqueioJudicial: "",
    saldoBloqueioJudicialAnterior: "",
    saldoLimite: "",
    transacoes: [],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await GetBankStatement(formData);
      setResponseData(response);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar o extrato bancário:", error);
    }
  };

  return (
    <div className="bg-[#0B3D48] w-[50%] rounded-md p-6">
      <div>
        <span className="font-bold">Buscar extrato</span>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-4">
              <label className="flex flex-col w-full sm:w-auto">
                Mês
                <input
                  type="number"
                  name="mes"
                  value={formData.mes}
                  onChange={handleChange}
                  className="border rounded p-2 text-gray-700"
                  required
                />
              </label>

              <label className="flex flex-col w-full sm:w-auto">
                Ano
                <input
                  type="number"
                  name="ano"
                  value={formData.ano}
                  onChange={handleChange}
                  className="border rounded p-2 text-gray-700"
                  required
                />
              </label>

              <label className="flex flex-col w-full sm:w-auto">
                Dia Inicial
                <input
                  type="number"
                  name="dataInicial"
                  value={formData.dataInicial}
                  onChange={handleChange}
                  className="border rounded p-2 text-gray-700"
                  required
                />
              </label>

              <label className="flex flex-col w-full sm:w-auto">
                Dia Final
                <input
                  type="number"
                  name="dataFinal"
                  value={formData.dataFinal}
                  onChange={handleChange}
                  className="border rounded p-2 text-gray-700"
                  required
                />
              </label>

              <label className="flex items-center gap-2 w-full sm:w-auto">
                Agrupar CNAB
                <input
                  type="checkbox"
                  name="agruparCNAB"
                  checked={formData.agruparCNAB === "true"}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      agruparCNAB: e.target.checked ? "true" : "false",
                    }))
                  }
                  className="border rounded text-blue-600 focus:ring focus:ring-blue-500"
                />
              </label>
            </div>
            <div>
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
            <h2 className="text-2xl font-bold text-white">Extrato Bancário</h2>

            <div className="mt-4 text-white">
              <p>
                <span className="font-bold">Saldo Anterior:</span>{" "}
                {responseData.saldoAnterior}
              </p>
              <p>
                <span className="font-bold">Saldo Atual:</span>{" "}
                {responseData.saldoAtual}
              </p>
              <p>
                <span className="font-bold">Saldo Bloqueado:</span>{" "}
                {responseData.saldoBloqueado}
              </p>
              <p>
                <span className="font-bold">Saldo Bloqueio Judicial:</span>{" "}
                {responseData.saldoBloqueioJudicial}
              </p>
              <p>
                <span className="font-bold">
                  Saldo Bloqueio Judicial Anterior:
                </span>{" "}
                {responseData.saldoBloqueioJudicialAnterior}
              </p>
              <p>
                <span className="font-bold">Saldo Limite:</span>{" "}
                {responseData.saldoLimite}
              </p>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-white">
              Transações
            </h3>
            <div className="mt-4">
              {responseData.transacoes.map((transacao, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-lg p-3 mb-3 text-white"
                >
                  <p>
                    <span className="font-bold">Data do Lote:</span>{" "}
                    {transacao.dataLote}
                  </p>
                  <p>
                    <span className="font-bold">Tipo:</span> {transacao.tipo}
                  </p>
                  <p>
                    <span className="font-bold">Descrição:</span>{" "}
                    {transacao.descricao}
                  </p>
                  <p>
                    <span className="font-bold">Descrição Complementar:</span>{" "}
                    {transacao.descInfComplementar}
                  </p>
                  <p>
                    <span className="font-bold">CPF/CNPJ:</span>{" "}
                    {transacao.cpfCnpj}
                  </p>
                  <p>
                    <span className="font-bold">Data:</span> {transacao.data}
                  </p>
                  <p>
                    <span className="font-bold">Número do Documento:</span>{" "}
                    {transacao.numeroDocumento}
                  </p>
                  <p>
                    <span className="font-bold">Valor:</span> {transacao.valor}
                  </p>
                </div>
              ))}
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
