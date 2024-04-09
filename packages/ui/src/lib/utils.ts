import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

dayjs.extend(relativeTime);
dayjs.extend(utc);

export const formatDateFromNow = (date?: string) => {
  return dayjs(date).utc().fromNow();
};

export const formatDate = (date: string) => {
  return dayjs(date).utc().format("MMM D, YYYY");
};

export const formatDateTime = (date: string) => {
  return dayjs(date).utc().format("MMM D, YYYY h:mm A");
};
