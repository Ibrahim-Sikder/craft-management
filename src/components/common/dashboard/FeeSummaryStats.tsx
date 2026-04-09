import {
  AttachMoney as MoneyIcon,
  Paid as PaidIcon,
  TrendingDown as DueIcon,
  Discount as DiscountIcon,
  TrendingUp as AdvanceIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material";
import StatsGrid from "./StatsGrid";
import { fmt, pct } from "@/utils/feeUtils";
import { FeeSummaryStatsProps } from "@/interface/fees";

const FeeSummaryStats = ({
  filteredTotal,
  grandTotal,
  filteredClassesLength,
  rawClassesLength,
  loading = false,
}: FeeSummaryStatsProps) => {
  const theme = useTheme();

  const stats = [
    {
      title: "Total Amount",
      icon: <MoneyIcon />,
      color: theme.palette.primary.main,
      value: fmt(filteredTotal.totalAmount),
      subtitle:
        filteredTotal.totalAmount !== grandTotal.totalAmount
          ? `of ${fmt(grandTotal.totalAmount)} total`
          : undefined,
      loading,
    },
    {
      title: "Total Paid",
      icon: <PaidIcon />,
      color: theme.palette.success.main,
      value: fmt(filteredTotal.totalPaid),
      subtitle: `${pct(filteredTotal.totalPaid, filteredTotal.totalAmount)} collection`,
      loading,
    },
    {
      title: "Total Due",
      icon: <DueIcon />,
      color: theme.palette.error.main,
      value: fmt(filteredTotal.totalDue),
      loading,
    },
    {
      title: "Discount",
      icon: <DiscountIcon />,
      color: theme.palette.warning.main,
      value: fmt(filteredTotal.totalDiscount),
      subtitle: `${pct(filteredTotal.totalDiscount, filteredTotal.totalAmount)} discount rate`,
      loading,
    },
    {
      title: "Advance",
      icon: <AdvanceIcon />,
      color: theme.palette.info.main,
      value: fmt(filteredTotal.totalAdvance),
      loading,
    },
    {
      title: "Classes",
      icon: <SchoolIcon />,
      color: theme.palette.secondary.main,
      value: `${filteredClassesLength} / ${rawClassesLength}`,
      subtitle: "showing / total",
      loading,
    },
  ];

  return <StatsGrid stats={stats} />;
};

export default FeeSummaryStats;
