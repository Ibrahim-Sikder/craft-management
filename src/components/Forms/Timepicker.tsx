import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InputAdornment } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Dayjs } from "dayjs";

interface ControlledTimePickerProps {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const CraftTimePicker: React.FC<ControlledTimePickerProps> = ({
  name,
  label = "Select Time",
  required = false,
  disabled = false,
  fullWidth = true,
}) => {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={null as unknown as Dayjs | null}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TimePicker
            label={label}
            value={value}
            onChange={onChange}
            disabled={disabled}
            slotProps={{
              textField: {
                required,
                fullWidth, 
                error: !!error,
                helperText: error ? error.message : null,
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default CraftTimePicker;
