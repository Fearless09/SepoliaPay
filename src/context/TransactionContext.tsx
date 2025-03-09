import { createContext, ReactNode, useContext, useState } from "react";
import { TransactionType } from "../utils/Type";

interface TransactionContextType {
  account: string;
  setAccount: (value: string) => void;
  transactionCount: number;
  setTransactionCount: (value: number) => void;
  transactions: TransactionType[];
  setTransactions: (value: TransactionType[]) => void;
  accountBal: string;
  setAccountBal: (value: string) => void;
  wrongChain: boolean;
  setWrongChain: (value: boolean) => void;
}

const Context = createContext<TransactionContextType>({
  account: "",
  setAccount: () => {},
  transactionCount: 0,
  setTransactionCount: () => {},
  transactions: [],
  setTransactions: () => {},
  accountBal: "",
  setAccountBal: () => {},
  wrongChain: false,
  setWrongChain: () => {},
});

export const { ethereum } = window;

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string>("");
  const [transactionCount, setTransactionCount] = useState<number>(
    Number(localStorage.getItem("transactionCount")) || 0,
  );
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [accountBal, setAccountBal] = useState<string>("");
  const [wrongChain, setWrongChain] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{
        account,
        setAccount,
        transactionCount,
        setTransactionCount,
        transactions,
        setTransactions,
        accountBal,
        setAccountBal,
        wrongChain,
        setWrongChain,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useTransactionContext = () => useContext(Context);
