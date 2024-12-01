import { useEffect, useState } from "react";
import getSaldo from "@/controller/getSaldo";
import axios from "axios";
import { toast } from "react-toastify";
import formatoMonetario from "@/utils/NumberFormat";
import { FaRegEyeSlash } from "react-icons/fa";

interface SaldoResponse {
  saldo: number;
  saldoLimite: number;
  saldoBloqueado: number;
}

export function AccountBalance() {
  const [saldo, setSaldo] = useState<SaldoResponse>();
  useEffect(() => {
    const fetchSaldo = async () => {
      const numeroContaCorrente = 57390010;

      try {
        const data = await getSaldo(numeroContaCorrente);
        if (data) {
          setSaldo(data);
        } else {
          toast.error("Erro ao buscar o saldo.");
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          toast.error(
            err.response?.data?.message || err.message || "Erro inesperado."
          );
        } else if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Erro inesperado.");
        }
      }
    };
    fetchSaldo();
  }, []);
  return (
    <div className="bg-[#0B3D48] p-6 rounded-md w-[450px]">
      <strong className="text-[18px]">Bem-vindo(a), Cooperado!</strong>
      <div className="flex flex-col">
        <div className="flex items-center justify-between my-2">
          <span className="font-semibold ">Saldo em conta</span>
          <span>
            <FaRegEyeSlash />
          </span>
        </div>
        <span className="text-[#63B900] font-bold text-[24px]">{formatoMonetario(saldo?.saldo)}</span>
      </div>
      <div className="border-t-2 my-2 border-gray-600 flex flex-col">
        <span className="text-[12px] mt-4">Saldo bloqueado: <span>{formatoMonetario(saldo?.saldoBloqueado)}</span></span>
        <span className="text-[12px]">Limite: <span>{formatoMonetario(saldo?.saldoLimite)}</span></span>
      </div>
    </div>
  );
}
