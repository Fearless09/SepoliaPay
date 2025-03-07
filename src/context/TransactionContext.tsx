import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";
import { getEthereumContract } from "../utils/constants";
import { TransactionType } from "../utils/Type";
import toast from "react-hot-toast";
import { truncateAddress } from "../helpers/utils";

interface TransactionDataType {
  receiver: string;
  message: string;
  amount: number;
  keyword: string;
}

interface TransactionContextType {
  connectWallet: () => Promise<void>;
  sendTransaction: () => Promise<void>;
  connectedAccount: string;
  transactionData: TransactionDataType;
  handleTranscationDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  transactionCount: number;
  transactions: TransactionType[];
}

const Context = createContext<TransactionContextType>({
  connectedAccount: "",
  connectWallet: async () => {},
  sendTransaction: async () => {},
  transactionData: {
    receiver: "",
    message: "",
    amount: 0,
    keyword: "",
  },
  handleTranscationDataChange: () => {},
  transactionCount: 0,
  transactions: [],
});

const { ethereum } = window;

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [connectedAccount, setConnectedAccount] = useState<string>("");
  const [transactionData, setTransactionData] = useState<TransactionDataType>({
    receiver: "",
    message: "",
    amount: 0,
    keyword: "",
  });
  const [transactionCount, setTransactionCount] = useState<number>(
    Number(localStorage.getItem("transactionCount")) || 0,
  );
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  function handleTranscationDataChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTransactionData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function getAllTransactions() {
    try {
      if (!ethereum) return toast.error("Please install metamask");
      const contract = await getEthereumContract();
      const transactions = await contract.getAllTransactions();
      const trn: TransactionType[] = transactions.map((transaction: any) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(
          Number(transaction.timestamp) * 1000,
        ).toLocaleString(),
        message: transaction.message,
        amount: Number(ethers.formatEther(transaction.amount)),
        keyword: transaction.keyword,
      }));
      setTransactions(trn);

      // console.log("All transactions", trn);
    } catch (error) {
      toast.error("Could not get all transactions");
      console.log("getAllTransactions error", error);
    }
  }

  async function isWalletConnected() {
    try {
      if (!ethereum) {
        toast.error("Please install metamask");
        return;
      }

      const accounts: string[] = await ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setConnectedAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log("no account founds");
      }
    } catch (error) {
      console.error("isWalletConnected error", error);
      throw new Error("No ethereum object");
    }
  }

  async function checkTransactions() {
    try {
      const contract = await getEthereumContract();
      const transactionCount: BigInt = await contract.getTransactionCounts();
      setTransactionCount(Number(transactionCount));
      window.localStorage.setItem(
        "transactionCount",
        transactionCount.toString(),
      );
    } catch (error) {
      console.log("checkTransaction error", error);
    }
  }

  async function connectWallet() {
    try {
      if (!ethereum) {
        toast.error("Please install metamask");
        return;
      }

      const accounts: string[] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setConnectedAccount(accounts[0]);
      toast.success(`Wallet Connected ${truncateAddress(accounts[0])}`);
    } catch (error) {
      toast.error("Could not connect wallet");
      console.error("connectWallet error", error);
      throw new Error("No ethereum object");
    }
  }

  async function sendTransaction() {
    const { receiver, message, amount, keyword } = transactionData;
    if (!receiver || !amount || !message || !keyword) return;

    try {
      if (!ethereum) {
        toast.error("Please install metamask");
        return;
      }

      const contract = await getEthereumContract();
      const parsedAmount = ethers.parseEther(amount.toString());
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: receiver,
            gas: "0x5208", //2100 gwei
            value: ethers.toBeHex(parsedAmount),
          },
        ],
      });
      const transaction_hash = await contract.addToBlockchain(
        receiver,
        message,
        parsedAmount,
        keyword,
      );
      await transaction_hash.wait();
      const transactionCount: BigInt = await contract.getTransactionCounts();
      // console.log("TransactionCount", Number(transactionCount.toString()));
      setTransactionCount(Number(transactionCount));
      getAllTransactions();
      toast.success("Transaction successful");
    } catch (error) {
      toast.error("Transaction failed");
      console.error("send transaction error", error);
      throw new Error("No ethereum object");
    }
  }

  useEffect(() => {
    isWalletConnected();
    checkTransactions();
  }, []);

  return (
    <Context.Provider
      value={{
        connectWallet,
        connectedAccount,
        transactionData,
        handleTranscationDataChange,
        sendTransaction,
        transactionCount,
        transactions,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useTransactionContext = () => useContext(Context);
