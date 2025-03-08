import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from "./";
import { cn, truncateAddress } from "../helpers/utils";
import { ComponentProps, FC, useState } from "react";
import { useTransactionContext } from "../context/TransactionContext";
import IdSection from "./IdSection";
import useConnectWallet from "../hooks/useConnectWallet";
import { TransactionDataType } from "../utils/Type";
import useSendTransaction from "../hooks/useSendTransaction";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border border-gray-400 text-sm font-light transition-transform duration-300 transform hover:scale-105";

const Welcome = () => {
  const { account } = useTransactionContext();
  const { connectWallet } = useConnectWallet();

  const [transactionData, setTransactionData] = useState<TransactionDataType>({
    receiver: "",
    message: "",
    amount: 0,
    keyword: "",
  });

  const { sendTransaction, sendingTransaction } = useSendTransaction({
    transactionData,
  });

  function handleTranscationDataChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTransactionData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div id="home" className="relative flex w-full items-center justify-center">
      <div className="mf:flex-row flex w-full flex-col items-center justify-between px-4 py-12 md:py-20">
        {/* First flex item */}
        <div className="mf:text-left max-mf:items-center flex w-full flex-col text-center">
          <h1 className="text-gradient transform text-4xl font-bold text-white transition-transform duration-300 sm:text-5xl md:text-6xl">
            Send Crypto <br /> Anywhere, Anytime
          </h1>
          <p className="mt-5 w-11/12 text-lg font-light text-white sm:text-xl md:w-9/12 md:text-2xl">
            Discover the world of cryptocurrency. Buy, sell, and transfer with
            ease on Krypto.
          </p>
          {!account && (
            <button
              type="button"
              onClick={connectWallet}
              className="my-5 mt-10 flex transform cursor-pointer items-center justify-center gap-2 rounded-full bg-[#2952e3] p-3 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#2546bd] active:scale-[.98]"
            >
              Connect Wallet
            </button>
          )}

          <div className="mt-10 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              "User-Friendly",
              "Fast Transactions",
              "DeFi",
              "Cross-Platform",
              "Low Fees",
              "Secure Wallet",
            ].map((feature, index) => (
              <div
                key={index}
                className={cn(commonStyles, "cursor-pointer", {
                  "rounded-tl-3xl": index === 0,
                  "rounded-tr-3xl": index === 2,
                  "rounded-bl-3xl": index === 3,
                  "rounded-br-3xl": index === 5,
                })}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Send flex item */}
        <div className="mf:items-end mt-10 flex w-full flex-col items-center justify-start">
          {/* Glassmorphism */}
          <div className="white-glassmorphism eth-card relative my-5 h-40 w-full flex-col items-start justify-end rounded-xl p-4 sm:w-72">
            <IdSection id="wallets" />
            <div className="flex h-full w-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-full border-2 border-white">
                  <SiEthereum fontSize={21} />
                </div>
                <BsInfoCircle fontSize={17} />
              </div>

              <div>
                <p className="text-sm font-light text-wrap text-white">
                  {truncateAddress(account)}
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  Ethereum
                </p>
              </div>
            </div>
          </div>

          <form
            className="blue-glassmorphism relative mt-5 flex w-full flex-col items-center justify-start p-5 sm:w-96"
            onSubmit={async (e) => {
              e.preventDefault();
              await sendTransaction();
            }}
          >
            <IdSection id="send" />
            <Input
              placeholder="Address To"
              name="receiver"
              type="text"
              onChange={handleTranscationDataChange}
              value={transactionData.receiver}
              required
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              onChange={handleTranscationDataChange}
              defaultValue={transactionData.amount || undefined}
              step={"0.0001"}
              required
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              onChange={handleTranscationDataChange}
              value={transactionData.keyword}
              required
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              onChange={handleTranscationDataChange}
              value={transactionData.message}
              required
            />

            <hr className="my-2 w-full border-gray-400" />
            {sendingTransaction ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="mt-2 w-full transform cursor-pointer rounded-full border border-[#3d4f7c] p-2 text-white transition-all duration-300 hover:scale-105 active:scale-[.98]"
              >
                Send Now
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const Input: FC<ComponentProps<"input">> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "white-glassmorphism my-2 w-full rounded-md border-hidden bg-transparent px-3 py-2 text-sm text-white outline-hidden",
        className,
      )}
      {...props}
    />
  );
};

export default Welcome;
