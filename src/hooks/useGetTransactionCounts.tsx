import { getEthereumContract } from "../utils/constants";
import { useTransactionContext } from "../context/TransactionContext";

export default function useGetTransactionCounts() {
  const { account, setTransactionCount } = useTransactionContext();

  async function getTransactionCounts() {
    try {
      const contract = await getEthereumContract();
      if (!account) return;
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

  return { getTransactionCounts };
}
