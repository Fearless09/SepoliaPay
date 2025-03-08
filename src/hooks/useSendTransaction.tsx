import toast from "react-hot-toast";
import { ethereum, useTransactionContext } from "../context/TransactionContext";
import { getEthereumContract } from "../utils/constants";
import { ethers } from "ethers";
import useGetTransactions from "./useGetTransactions";
import useGetTransactionCounts from "./useGetTransactionCounts";
import { TransactionDataType } from "../utils/Type";
import { useState } from "react";

export default function useSendTransaction({
  transactionData,
}: {
  transactionData: TransactionDataType;
}) {
  const [sendingTransaction, setSendingTransaction] = useState<boolean>(false);

  const { account } = useTransactionContext();
  const { getAllTransactions } = useGetTransactions();
  const { getTransactionCounts } = useGetTransactionCounts();

  async function sendTransaction() {
    const { receiver, message, amount, keyword } = transactionData;
    if (!receiver || !amount || !message || !keyword) return;

    try {
      if (!ethereum) {
        toast.error("Please install metamask");
        return;
      }

      setSendingTransaction(true);
      const contract = await getEthereumContract();
      const parsedAmount = ethers.parseEther(amount.toString());
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
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
      await getTransactionCounts();
      await getAllTransactions();
      toast.success("Transaction successful");
    } catch (error) {
      toast.error("Transaction failed");
      console.error("send transaction error", error);
      throw new Error("No ethereum object");
    } finally {
      setSendingTransaction(false);
    }
  }

  return { sendTransaction, sendingTransaction };
}
