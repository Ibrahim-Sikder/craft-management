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
  value?: string; // ✅ added value
  margin?: "none" | "normal" | "dense";
  onChange?: (value: any) => void;
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
  value, // ✅ received value
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
          value={value !== undefined ? value : field.value} // ✅ prefer props.value if given
          sx={{ ...sx }}
          size={size}
          select
          label={label}
          required={required}
          fullWidth={fullWidth}
          error={isError}
          margin={margin}
          onChange={(e) => {
            field.onChange(e); // for react-hook-form state
            if (onChange) {
              onChange(e.target.value); // for external custom handler
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
