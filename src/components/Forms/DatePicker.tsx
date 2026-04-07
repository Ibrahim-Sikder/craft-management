import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller, useFormContext } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { SxProps } from "@mui/material";
import { useEffect } from "react";

interface ITASDatepickerProps {
  name: string;
  size?: "small" | "medium";
  label?: React.ReactNode;
  required?: boolean;
  fullWidth?: boolean;
  margin?: "none" | "normal" | "dense";
  sx?: SxProps;
  disableFuture?: boolean;
  disabled?: boolean;
}

const CraftDatePicker = ({
  name,
  size = "medium",
  label,
  required,
  fullWidth = true,
  margin = "normal",
  sx,
  disabled = false,
}: ITASDatepickerProps) => {
  const { control, setValue, getValues } = useFormContext();

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Set default value when component mounts or when form is reset
  useEffect(() => {
    const currentValue = getValues(name);
    if (!currentValue || currentValue === "") {
      setValue(name, getTodayDate(), {
        shouldValidate: true,
        shouldDirty: false,
      });
    }
  }, [name, setValue, getValues]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        // If no value exists or value is empty, use today's date
        let dateValue: Dayjs;

        if (value && value !== "") {
          dateValue = dayjs(value);
          // Check if the date is valid
          if (!dateValue.isValid()) {
            dateValue = dayjs(getTodayDate());
          }
        } else {
          dateValue = dayjs(getTodayDate());
        }

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={label}
              {...field}
              onChange={(date: Dayjs | null) => {
                if (date && date.isValid()) {
                  onChange(date.format("YYYY-MM-DD"));
                } else {
                  // If date is null or invalid, use today's date
                  const todayDate = getTodayDate();
                  onChange(todayDate);
                  setValue(name, todayDate);
                }
              }}
              value={dateValue}
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
                  disabled: disabled,
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
