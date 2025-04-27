
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller, useFormContext } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { SxProps } from "@mui/material";

interface ITASDatepickerProps {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  margin?: "none" | "normal" | "dense";
  sx?: SxProps;
  disableFuture?: boolean;
}

const CraftDatePicker = ({
  name,
  size = "medium",
  label,
  required,
  fullWidth = true,
  margin = "normal",
  sx,
}: ITASDatepickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs().format("YYYY-MM-DD")} // Set default value
      render={({ field: { onChange, value, ...field } }) => {
        const dateValue: Dayjs = value ? dayjs(value) : dayjs();

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={label}
              {...field}
              onChange={(date: Dayjs | null) => {
                const finalDate = date || dayjs();
                onChange(finalDate.format("YYYY-MM-DD"));
              }}
              value={dateValue}
              // maxDate={disableFuture ? dayjs() : undefined}
              slotProps={{
                textField: {
                  required: required,
                  size: size,
                  sx: {
                    ...sx,
                  },
                  variant: "outlined",
                  fullWidth: fullWidth,
                  margin: margin,
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default CraftDatePicker;
