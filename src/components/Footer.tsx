import { nav_links } from "./Navbar";

const date = new Date();

const Footer = () => {
  return (
    <footer className="gradient-bg-footer w-full p-6 text-white transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex w-full flex-col items-center justify-between md:justify-center">
        <div className="my-6 flex w-full flex-col items-center justify-between sm:flex-row">
          <a href="#home">
            <img
              src="/logo.png"
              className="w-32 transition-transform duration-300 hover:scale-105"
              alt="footer logo"
            />
          </a>

          <div className="mt-5 flex w-full flex-wrap items-center justify-evenly gap-3 sm:mt-0 sm:justify-end">
            {nav_links.map((link, index) => (
              <a
                key={index}
                className="mx-2 cursor-pointer text-center capitalize transition-colors duration-300 hover:text-gray-300"
                href={link === "send eTH" ? "#send" : `#${link}`}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <hr className="mt-6 w-full rounded-full border-gray-400/90" />
        <div className="mt-4 flex w-full items-center justify-between">
          <p className="text-center text-sm">
            Toheeb Opeyemi © {date.getFullYear()}
          </p>
          <p className="text-center text-sm">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
