import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// https://stackoverflow.com/questions/69390216/how-to-properly-join-tailwind-css-classes-using-clsx
