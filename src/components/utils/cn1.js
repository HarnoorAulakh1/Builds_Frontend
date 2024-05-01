import {clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn1(...inputs) {
  return twMerge(clsx(inputs));
}
