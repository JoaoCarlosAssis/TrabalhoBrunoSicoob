import getBanlProofIdempotency from "@/controller/getBanlProofIdempotency";
import { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  idPagamento: string;
}

interface ResponseData {
  situacaoPagamento: string;
  dataPagamento: string;
  dataVencimento: string;
  valorBoleto: number;
  valorPagamento: number;
  valorMultaMora: number;
  descricaoObservacao: string;
  numeroAutenticacaoPagamento: string;
  nomeFantasiaPagador: string;
  numeroCpfCnpjPagador: string;
  nomeRazaoSocialBeneficiario: string;
  numeroCpfCnpjBeneficiario: string;
}

export function ProofPaymentIdempotency() {
  const [formData, setFormData] = useState<FormData>({
    idPagamento: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

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
    try {
      const response = await getBanlProofIdempotency(formData);
      setResponseData(response.resultado);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar dados do boleto!", error);
    }
  };

  return (
    <div className="bg-[#0B3D48] min-w-[400px] rounded-md p-6">
      <div>
        <span className="font-bold">Comprovante Pagamento (idempotency)</span>
        <div>
          <form onSubmit={handlesubmit}>
            <div className="flex flex-wrap gap-4">
              <label className="flex flex-col w-full sm:w-auto">
                ID Pagamento
                <input
                  type="number"
                  name="idPagamento"
                  value={formData.idPagamento}
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
            <h2 className="text-2xl font-bold text-white">
              Detalhes do Pagamento
            </h2>

            <div className="mt-4 text-white">
              <p>
                <span className="font-bold">Situação do Pagamento:</span>{" "}
                {responseData?.situacaoPagamento}
              </p>
              <p>
                <span className="font-bold">Data de Pagamento:</span>{" "}
                {responseData?.dataPagamento}
              </p>
              <p>
                <span className="font-bold">Data de Vencimento:</span>{" "}
                {responseData?.dataVencimento}
              </p>
              <p>
                <span className="font-bold">Valor do Boleto:</span> R${" "}
                {responseData?.valorBoleto?.toFixed(2)}
              </p>
              <p>
                <span className="font-bold">Valor Pago:</span> R${" "}
                {responseData?.valorPagamento?.toFixed(2)}
              </p>
              <p>
                <span className="font-bold">Multa e Mora:</span> R${" "}
                {responseData?.valorMultaMora?.toFixed(2)}
              </p>
              <p>
                <span className="font-bold">Descrição:</span>{" "}
                {responseData?.descricaoObservacao}
              </p>
              <p>
                <span className="font-bold">Autenticação:</span>{" "}
                {responseData?.numeroAutenticacaoPagamento}
              </p>
              <p>
                <span className="font-bold">Nome do Pagador:</span>{" "}
                {responseData?.nomeFantasiaPagador}
              </p>
              <p>
                <span className="font-bold">CPF/CNPJ do Pagador:</span>{" "}
                {responseData?.numeroCpfCnpjPagador}
              </p>
              <p>
                <span className="font-bold">Beneficiário:</span>{" "}
                {responseData?.nomeRazaoSocialBeneficiario}
              </p>
              <p>
                <span className="font-bold">CPF/CNPJ do Beneficiário:</span>{" "}
                {responseData?.numeroCpfCnpjBeneficiario}
              </p>
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
