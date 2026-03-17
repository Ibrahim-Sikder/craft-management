/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuItem, SxProps, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

// ✅ Support both plain strings and { label, value } objects
type SelectItem = string | { label: string; value: string };

interface ITextField {
  name: string;
  size?: "small" | "medium";
  placeholder?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  items: SelectItem[];
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

  // ✅ Normalize any item to { label, value }
  const normalizedItems = items.map((item) =>
    typeof item === "string" ? { label: item, value: item } : item,
  );

  // ✅ Default to first item's value or empty string
  const resolvedDefault = defaultValue ?? (normalizedItems[0]?.value || "");

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={resolvedDefault}
      render={({ field }) => (
        <TextField
          {...field}
          value={value !== undefined ? value : (field.value ?? "")}
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
          {normalizedItems.map((item) => (
            // ✅ key and value are always strings — no object rendered as child
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default CraftSelect;
