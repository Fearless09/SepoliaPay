import { useEffect, useState } from "react";
import { ethereum, useTransactionContext } from "../context/TransactionContext";
import toast from "react-hot-toast";
import useGetTransactionCounts from "./useGetTransactionCounts";
import useGetTransactions from "./useGetTransactions";
import { toBigInt, toBeHex } from "ethers";
import { sepolia_id } from "../utils/constants";

export default function useGetAccount() {
  const [loadingAccount, setLoadingAccount] = useState<boolean>(false);
  const { setAccount, account, setWrongChain } = useTransactionContext();
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

  async function checkChain() {
    try {
      if (!ethereum) {
        toast.error("Please install metamask");
        return;
      }
      if (!account) return;
      const chainIdRes = await ethereum.request({
        method: "eth_chainId",
      });

      const chainId = Number(toBigInt(chainIdRes));
      if (chainId === sepolia_id) {
        setWrongChain(false);
      } else {
        setWrongChain(true);
      }
    } catch (error) {
      console.error("checking chain Id error", error);
      throw new Error("No ethereum object");
    }
  }

  async function switchChain() {
    try {
      if (!ethereum) {
        toast.error("Please install metamask");
        return;
      }
      if (!account) return;
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toBeHex(sepolia_id) }],
      });
      await getAccount();
      await checkChain();
    } catch (error) {
      console.error("switch error", error);
      throw new Error("No ethereum object");
    }
  }

  useEffect(() => {
    getAccount();
    checkChain();
  }, [account]);

  return { loadingAccount, getAccount, checkChain, switchChain };
}
