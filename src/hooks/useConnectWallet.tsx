import toast from "react-hot-toast";
import { ethereum, useTransactionContext } from "../context/TransactionContext";
import { truncateAddress } from "../helpers/utils";
import { useState } from "react";
import useGetTransactionCounts from "./useGetTransactionCounts";
import useGetTransactions from "./useGetTransactions";

export default function useConnectWallet() {
  const [connecting, setConnecting] = useState<boolean>(false);
  const { setAccount, setTransactionCount, setTransactions } =
    useTransactionContext();
  const { getTransactionCounts } = useGetTransactionCounts();
  const { getAllTransactions } = useGetTransactions();

  async function connectWallet() {
    try {
      if (!ethereum) {
        toast.error("Please install metamask");
        return;
      }

      setConnecting(true);
      const accounts: string[] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      await getAllTransactions();
      await getTransactionCounts();
      toast.success(`Wallet Connected ${truncateAddress(accounts[0])}`);
    } catch (error) {
      setAccount("");
      toast.error("Could not connect wallet");
      console.error("connectWallet error", error);
      throw new Error("No ethereum object");
    } finally {
      setConnecting(false);
    }
  }

  async function disconnectWallet() {
    await window.ethereum.request({
      method: "wallet_revokePermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    setAccount("");
    setTransactionCount(0);
    setTransactions([]);
  }

  return { connectWallet, connecting, disconnectWallet };
}
