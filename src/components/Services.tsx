import { ReactNode } from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { cn } from "../helpers/utils";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const Services = () => {
  return (
    <div className="gradient-bg-services flex w-full flex-col items-center justify-center px-4 py-12 md:flex-row md:p-20">
      <div className="itemscenter flex flex-1 flex-col justify-center text-center md:text-left">
        <h1 className="text-gradient text-4xl !leading-[1.1] font-bold text-white sm:text-6xl">
          Our Commitment to Excellence
        </h1>
        <p className="mt-4 text-lg text-white">
          Discover the services we continually enhance to serve you better.
        </p>
      </div>
      <div className="mt-8 flex flex-1 flex-col items-center justify-center md:mt-0 md:items-end">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default Services;

type CardProps = {
  color: string;
  title: string;
  icon: ReactNode;
  subtitle: string;
};

const services: CardProps[] = [
  {
    color: "bg-[#2952e3]",
    title: "Security Guaranteed",
    icon: <BsShieldFillCheck />,
    subtitle:
      "Your security is our priority. We ensure privacy and quality in all our products.",
  },
  {
    color: "bg-[#8945F8]",
    title: "Best Exchange Rates",
    icon: <BiSearchAlt />,
    subtitle: "We offer the most competitive exchange rates in the market.",
  },
  {
    color: "bg-[#F84550]",
    title: "Fastest Transactions",
    icon: <RiHeart2Fill />,
    subtitle:
      "Experience lightning-fast transactions with our optimized platform.",
  },
];

const ServiceCard = ({ color, title, icon, subtitle }: CardProps) => (
  <button className="white-glassmorphism m-2 flex w-full transform cursor-pointer flex-row items-center justify-start p-3 text-left text-white transition-transform hover:scale-105 hover:shadow-2xl sm:w-[80%]">
    <div
      className={cn(
        "flex size-10 items-center justify-center rounded-full p-2 text-[24px]",
        color,
      )}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-1 flex-col">
      <h1 className="mt-2 text-lg font-semibold">{title}</h1>
      <p className="mt-2 text-sm md:w-9/12">{subtitle}</p>
    </div>
  </button>
);
