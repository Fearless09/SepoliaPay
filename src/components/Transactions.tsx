import { useTransactionContext } from "../context/TransactionContext";
import { cn, truncateAddress } from "../helpers/utils";
import useFetchGiphyUrl from "../hooks/useFetchGiphyUrl";
import { TransactionType } from "../utils/Type";
import Loader from "./Loader";

const Transactions = () => {
  const { connectedAccount, transactions } = useTransactionContext();

  return (
    <div
      id="transactions"
      className="gradient-bg-transactions relative flex w-full items-center justify-center text-white 2xl:px-20"
    >
      <div className="flex flex-col px-4 py-12 md:p-12">
        <h3 className="my-2 text-center text-3xl">
          {connectedAccount
            ? "Your Recent Transactions"
            : "Connect Your Wallet to View Transactions"}
        </h3>

        <div className="mt-10 flex flex-wrap items-center justify-center">
          {transactions.length > 0 ? (
            transactions
              .reverse()
              .map((transaction, index) => (
                <TransactionCard key={index} transaction={transaction} />
              ))
          ) : (
            <p className="text-lg">No transactions found. Start trading!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;

interface CardProps {
  transaction: TransactionType;
}

const TransactionCard = ({ transaction }: CardProps) => {
  const { addressFrom, addressTo, amount, message, timestamp, url } =
    transaction;
  const { giphyLoading, giphyUrl } = useFetchGiphyUrl({ keyword: message });

  return (
    <div className="m-4 flex flex-1 transform flex-col rounded-md bg-[#181918] p-3 transition-shadow duration-300 hover:shadow-2xl sm:max-w-[300px] sm:min-w-[270px] 2xl:max-w-[500px] 2xl:min-w-[450px]">
      <div className="mt-3 flex w-full flex-col items-center">
        <div className="mb-6 flex w-full flex-col p-2">
          <a
            href={`https://sepolia.etherscan.io/tx/${addressFrom}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 transition-all hover:opacity-80"
          >
            From: {truncateAddress(addressFrom)}
          </a>
          <a
            href={`https://sepolia.etherscan.io/tx/${addressTo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 transition-all hover:opacity-80"
          >
            To: {truncateAddress(addressTo)}
          </a>

          <p className="text-lg font-medium">
            Amount: <span className="font-bold">{amount} ETH</span>
          </p>
          {!!message && (
            <>
              <br />
              <p className="italic">Message: {message}</p>
            </>
          )}
        </div>
        <div
          className={cn(
            "h-64 w-full overflow-hidden rounded-md object-cover object-center shadow-lg 2xl:h-96",
            { "flex items-center justify-center": giphyLoading },
          )}
        >
          {giphyLoading ? (
            <Loader className="size-32 2xl:size-72" />
          ) : (
            <img
              src={giphyUrl || url}
              alt="gif"
              className="h-full w-full transform object-cover object-center transition-transform duration-300 hover:scale-105"
            />
          )}
        </div>
        <div className="relative z-[1] -mt-5 w-max rounded-xl bg-black p-3 px-5 shadow-2xl">
          <p className="font-bold text-[#37c7da]">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};
