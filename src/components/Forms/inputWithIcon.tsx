import { SxProps, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  size?: "small" | "medium";
  type?: string;
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
  variant?: "outlined" | "filled" | "standard";
  margin?: "none" | "normal" | "dense";
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  value?: string;
  defaultValue?: string; // Add defaultValue to props
  autoFocus?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  startAdornment?: React.ReactNode;
  InputProps?: object;
};

const CraftInputWithIcon = ({
  name,
  label,
  size = "medium",
  type = "text",
  fullWidth,
  sx,
  disabled,
  placeholder,
  required,
  variant = "outlined",
  margin = "normal",
  multiline = false,
  rows = 4,
  autoFocus = false,
  onChange,
  value,
  defaultValue,
  InputProps,
}: TInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({
        field: { onChange: fieldOnChange, value: fieldValue },
        fieldState: { error },
      }) => (
        <TextField
          onChange={onChange || fieldOnChange}
          type={type}
          label={label}
          size={size}
          variant={variant}
          fullWidth={fullWidth}
          sx={{ ...sx }}
          placeholder={placeholder}
          required={required}
          margin={margin}
          error={!!error?.message}
          helperText={error?.message}
          multiline={multiline}
          rows={rows}
          value={value !== undefined ? value : fieldValue}
          autoFocus={autoFocus}
          disabled={disabled}
          InputProps={InputProps}
        />
      )}
    />
  );
};

export default CraftInputWithIcon;