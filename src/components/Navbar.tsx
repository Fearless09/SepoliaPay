import { HiMenu } from "react-icons/hi";
import { SiEthereum } from "react-icons/si";
import { AiOutlineClose, AiOutlineDisconnect } from "react-icons/ai";
import { TiWarning } from "react-icons/ti";
import { cn, truncateAddress } from "../helpers/utils";
import { ComponentProps, FC, useEffect, useState } from "react";
import useOutsideClickClose from "../hooks/useOutsideClickClose";
import useEscKeyClose from "../hooks/useEscKeyClose";
import { useTransactionContext } from "../context/TransactionContext";
import useConnectWallet from "../hooks/useConnectWallet";
import useGetBalance from "../hooks/useGetBalance";
import useGetAccount from "../hooks/useGetAccount";

export const nav_links = ["home", "send eTH", "transactions", "wallets"];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const ref = useOutsideClickClose<HTMLDivElement>(() => setOpenMenu(false));
  useEscKeyClose(() => setOpenMenu(false));

  const { account, accountBal, wrongChain } = useTransactionContext();
  const { connectWallet, disconnectWallet } = useConnectWallet();
  const { getBalance } = useGetBalance();
  const { switchChain } = useGetAccount();

  useEffect(() => {
    getBalance();
  }, [account]);

  return (
    <header className="white-glassmorphism fixed inset-x-0 top-0 z-[9] rounded-none border-hidden text-white">
      <nav className="container mx-auto flex w-full items-center justify-between p-4">
        <a href="#home" className="shrink-0">
          <img
            src={"/sepoliapay.webp"}
            alt="Company Logo"
            className="w-12 cursor-pointer rounded-full"
          />
        </a>

        <div className="flex items-center">
          <ul className="hidden flex-initial list-none flex-row items-center justify-between text-white md:flex">
            {nav_links.map((link, index) => (
              <NavbarList
                key={index}
                className="text-white hover:underline"
                href={link === "send eTH" ? "#send" : `#${link}`}
              >
                {link}
              </NavbarList>
            ))}
          </ul>

          {account ? (
            <>
              {/* Account details button */}
              <button className="transition-300 white-glassmorphism mx-4 flex cursor-pointer items-center overflow-hidden text-xs font-medium active:scale-[.98]">
                <span className="px-2 py-3">{truncateAddress(account)}</span>
                {!!accountBal && (
                  <span className="flex items-center gap-1 bg-[#2952e3] px-2 py-3">
                    <SiEthereum className="size-3.5" /> {accountBal} ETH
                  </span>
                )}
              </button>
              {/* Wrong Chain button */}
              {wrongChain && (
                <button
                  className="transition-300 blue-glassmorphism me-4 flex size-10 cursor-pointer items-center justify-center rounded-full border-yellow-400 text-yellow-400 hover:opacity-80 active:scale-105"
                  title="switch chain"
                  onClick={switchChain}
                >
                  <TiWarning className="size-[18px]" />
                </button>
              )}
              {/* Disconnect button */}
              <button
                className="transition-300 flex size-10 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white hover:opacity-80 active:scale-105"
                title="Disconnect"
                onClick={disconnectWallet}
              >
                <AiOutlineDisconnect className="size-[18px]" />
              </button>
            </>
          ) : (
            // Connect button
            <button
              className="transition-300 ms-4 cursor-pointer rounded-full bg-[#2952e3] px-7 py-2 hover:bg-[#2546bd] active:scale-[.98]"
              onClick={async () => {
                await connectWallet();
              }}
            >
              Connect
            </button>
          )}

          {/* Mobile Menu */}
          <div className="relative ms-4 flex md:hidden" ref={ref}>
            {/* Open menu button */}
            <button
              className="transition-300 cursor-pointer text-white hover:opacity-80 active:scale-[.98]"
              onClick={() => setOpenMenu(true)}
              aria-label="Open menu"
            >
              <HiMenu fontSize={28} />
            </button>

            {openMenu && (
              <ul
                className={cn(
                  "blue-glassmorphism animate-slide-in fixed top-0 -right-2 z-10 flex h-dvh w-[70vw] list-none flex-col items-end justify-start rounded-md p-4 opacity-0 shadow-2xl transition-all duration-300 md:hidden",
                  { "opacity-100": openMenu },
                )}
              >
                <li className="my-2 w-full">
                  {/* Close menu button */}
                  <button
                    className="transition-300 cursor-pointer text-xl text-white hover:opacity-80 active:scale-[.98]"
                    onClick={() => setOpenMenu(false)}
                    aria-label="Close menu"
                  >
                    <AiOutlineClose />
                  </button>
                </li>
                {nav_links.map((link, index) => (
                  <NavbarList
                    key={index}
                    className="my-2 text-lg text-white hover:opacity-80 active:scale-[.98]"
                    onClick={() => setOpenMenu(false)}
                    href={link === "send eTH" ? "#send" : `#${link}`}
                  >
                    {link}
                  </NavbarList>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

const NavbarList: FC<ComponentProps<"a">> = ({ className, ...props }) => {
  return (
    <a
      className={cn(
        "transition-300 mx-3 cursor-pointer capitalize hover:text-white/80",
        className,
      )}
      {...props}
    />
  );
};
