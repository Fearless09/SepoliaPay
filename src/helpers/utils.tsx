import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
};
