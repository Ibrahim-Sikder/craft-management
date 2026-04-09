import { ClientFilters, YearlyData } from "@/interface/fees";

export const DEFAULT_CLIENT_FILTERS: ClientFilters = {
    search: "",
    class: "",
    month: "",
    minDue: "",
    minPaid: "",
    minAdvance: "",
    sortBy: "class",
    sortDir: "asc",
};

export const ZERO_TOTAL: YearlyData = {
    totalAmount: 0,
    totalPaid: 0,
    totalDue: 0,
    totalDiscount: 0,
    totalWaiver: 0,
    totalAdvance: 0,
};