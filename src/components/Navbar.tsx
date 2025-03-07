import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { cn } from "../helpers/utils";
import { ComponentProps, FC, useState } from "react";
import useOutsideClickClose from "../hooks/useOutsideClickClose";
import useEscKeyClose from "../hooks/useEscKeyClose";

export const nav_links = ["home", "send eTH", "transactions", "wallets"];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const ref = useOutsideClickClose<HTMLDivElement>(() => setOpenMenu(false));
  useEscKeyClose(() => setOpenMenu(false));

  return (
    <nav className="flex w-full items-center justify-between p-4">
      <div className="flex-initial items-center justify-center md:flex-[0.5]">
        <img
          src={"/sepoliapay.webp"}
          alt="Company Logo"
          className="w-12 cursor-pointer rounded-full"
        />
      </div>
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
        <li className="transition-300 mx-4 cursor-pointer rounded-full bg-[#2952e3] px-7 py-2 hover:bg-[#2546bd] active:scale-[.98]">
          Login
        </li>
      </ul>

      {/* Mobile Menu */}
      <div className="relative flex md:hidden" ref={ref}>
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
    </nav>
  );
};

export default Navbar;

const NavbarList: FC<ComponentProps<"a">> = ({ className, ...props }) => {
  return (
    <a
      className={cn(
        "transition-300 mx-4 cursor-pointer capitalize hover:text-white/80",
        className,
      )}
      {...props}
    />
  );
};
