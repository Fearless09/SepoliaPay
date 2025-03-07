import abi from "./transaction_abi.json";
import { ethers } from "ethers";

export const CONSTRACT_ADDRESS = "0xa7e49e73585a08465f1e33b3fa4266609a845c10";
export const CONTRACT_ABI = abi.output.abi;

export const getEthereumContract = async () => {
  const { ethereum } = window;
  
  if (!ethereum) throw new Error("Ethereum object does not exist");
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONSTRACT_ADDRESS, CONTRACT_ABI, signer);
  return contract;
};
