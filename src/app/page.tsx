"use client";

import { AccountBalance } from "@/components/accountBalance/AccountBalance";
import { BankColletcion } from "@/components/bankCharge/BankCharge";
import { BankCollectionDDA } from "@/components/bankCollectionDDA/BankCollectionDDA";
import { CurrentAccountStatement } from "@/components/currentAccountStatement/CurrentAccountStatement";
import { HeaderMenu } from "@/components/headerMenu/HeaderMenu";
import { ProofPayment } from "@/components/proofPayment/ProofPayment";
import { ProofPaymentIdempotency } from "@/components/proofPaymentIdempotency/ProofPaymentIdempotency";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className="">
      <ToastContainer />
      <HeaderMenu />
      <div className="p-6 flex flex-wrap gap-6">
        <AccountBalance />
        <CurrentAccountStatement />
        <ProofPayment/>
        <BankColletcion/>
        <ProofPaymentIdempotency/>
        <BankCollectionDDA/>
      </div>
    </div>
  );
}
