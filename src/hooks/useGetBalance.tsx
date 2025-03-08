import { useState } from "react";
import { ethereum, useTransactionContext } from "../context/TransactionContext";
import toast from "react-hot-toast";
import { formatEther } from "ethers";

function useGetBalance() {
  const { account, setAccountBal } = useTransactionContext();
  const [loadingBal, setLoadingBal] = useState<boolean>(false);

  async function getBalance() {
    try {
      if (!ethereum) {
        toast.error("Please install metamask");
        return;
      }
      if (!account) return;
      setLoadingBal(true);
      const balance = await ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
        id: 11155111,
      });
      setAccountBal(Number(formatEther(balance)).toFixed(4));
      //   console.log("Balance", formatEther(balance));
    } catch (error) {
      setAccountBal("");
      console.error("get balance error", error);
      throw new Error("No ethereum object");
    } finally {
      setLoadingBal(false);
    }
  }
  return { getBalance, loadingBal };
}

export default useGetBalance;

// eth_chainId
