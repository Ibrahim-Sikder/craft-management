import * as React from "react";
import {  SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TTextareaProps = {
  name: string;
  label?: string;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  sx?: SxProps;
  required?: boolean;
  variant?: "outlined" | "filled" | "standard";
  margin?: "none" | "normal" | "dense";
  disabled?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  startAdornment?: React.ReactNode;
  InputProps?: object;
};

const CraftTextArea = ({
  name,
  label,
  placeholder,
  minRows = 2,
  maxRows,
  sx,
  required,
  variant = "outlined",
  margin = "normal",
  disabled,
  value,
  onChange,
  InputProps,
  fullWidth = true,
}: TTextareaProps) => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label={label}
            placeholder={placeholder}
            minRows={minRows}
            maxRows={maxRows}
            InputLabelProps={{
              shrink: true,
            }}
            multiline
            variant={variant}
            margin={margin}
            disabled={disabled}
            fullWidth={fullWidth}
            InputProps={InputProps}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              field.onChange(e.target.value);
              if (onChange) onChange(e as React.ChangeEvent<HTMLInputElement>);
            }}
            value={field.value || value || ""}
            error={!!error}
            helperText={error ? error.message : ""}
            sx={{
              width: "100%",
              maxHeight: "300px",
              ...sx,
            }}
          />
        )}
      />
    </>
  );
};

export default CraftTextArea;
