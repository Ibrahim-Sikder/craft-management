/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuItem, SxProps, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ITextField {
  name: string;
  size?: "small" | "medium";
  placeholder?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  items: string[];
  defaultValue?: string;
  value?: string;
  margin?: "none" | "normal" | "dense";
  onChange?: (value: any) => void;
  disabled?: boolean;
}

const CraftSelect = ({
  items,
  name,
  label,
  size = "medium",
  margin = "normal",
  required,
  fullWidth = true,
  sx,
  onChange,
  defaultValue,
  value,
  disabled = false,
}: ITextField) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ?? items[0] ?? ""}
      render={({ field }) => (
        <TextField
          {...field}
          value={value !== undefined ? value : field.value}
          sx={{ ...sx }}
          size={size}
          select
          label={label}
          required={required}
          fullWidth={fullWidth}
          error={isError}
          margin={margin}
          disabled={disabled} 
          onChange={(e) => {
            field.onChange(e);
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          helperText={
            isError ? (formState.errors[name]?.message as string) : ""
          }
        >
          {items.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default CraftSelect;
