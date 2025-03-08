import { useEffect, useState } from "react";
import { ethereum, useTransactionContext } from "../context/TransactionContext";
import toast from "react-hot-toast";
import useGetTransactionCounts from "./useGetTransactionCounts";
import useGetTransactions from "./useGetTransactions";

export default function useGetAccount() {
  const [loadingAccount, setLoadingAccount] = useState<boolean>(false);
  const { setAccount } = useTransactionContext();
  const { getTransactionCounts } = useGetTransactionCounts();
  const { getAllTransactions } = useGetTransactions();

  async function getAccount() {
    try {
      if (!ethereum) {
        toast.error("Please install metamask");
        return;
      }
      setLoadingAccount(true);
      const accounts: string[] = await ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setAccount(accounts[0]);
        await getAllTransactions();
        await getTransactionCounts();
      } else {
        setAccount("");
        console.log("no account founds");
      }
    } catch (error) {
      console.error("isWalletConnected error", error);
      throw new Error("No ethereum object");
    } finally {
      setLoadingAccount(false);
    }
  }

  useEffect(() => {
    getAccount();
  }, []);

  return { loadingAccount, getAccount };
}
