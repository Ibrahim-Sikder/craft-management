import { SxProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from 'dayjs';

interface IDatePicker {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  margin?: "none" | "normal" | "dense";
  disablePast?: boolean;
  InputProps?: object; 
}

const CraftDatePicker = ({
  name,
  size = "medium",
  label,
  required,
  fullWidth = true,
  margin = "normal",
  // disablePast = true,
  InputProps, 
  sx,
}: IDatePicker) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        // Ensure value is a dayjs object or null
        const dateValue = value ? dayjs(value) : null;

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={label}
              {...field}
              onChange={(date) => onChange(date ? date.toISOString() : null)} 
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
                  InputProps: InputProps, // Move InputProps here
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
