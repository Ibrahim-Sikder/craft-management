import { format } from "date-fns";
import { bn } from "date-fns/locale";
export const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatShortDate = (date: string | Date) => {
  try {
    return format(new Date(date), "dd MMM yyyy", { locale: bn });
  } catch {
    return "Invalid date";
  }
};
