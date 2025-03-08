import toast from "react-hot-toast";
import { ethereum, useTransactionContext } from "../context/TransactionContext";
import { getEthereumContract } from "../utils/constants";
import { TransactionType } from "../utils/Type";
import { ethers } from "ethers";
import { useState } from "react";
import useGetTransactionCounts from "./useGetTransactionCounts";

const useGetTransactions = () => {
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const { account, setTransactions } = useTransactionContext();
  const { getTransactionCounts } = useGetTransactionCounts();

  async function getAllTransactions() {
    try {
      if (!ethereum) return toast.error("Please install metamask");
      setLoadingTransaction(true);
      if (!account) return;

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
      await getTransactionCounts();
    } catch (error) {
      setTransactions([]);
      toast.error("Could not get all transactions");
      console.log("getAllTransactions error", error);
    } finally {
      setLoadingTransaction(false);
    }
  }

  return { getAllTransactions, loadingTransaction };
};

export default useGetTransactions;
