/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputAdornment, MenuItem, SxProps, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ITextField {
  name: string;
  size?: "small" | "medium";
  placeholder?: string;
  label?: React.ReactNode;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  items: string[];
  margin?: "none" | "normal" | "dense";
  onChange?: (value: any) => void;
  adornment?: React.ReactNode;
  disabled?: boolean
}

const CraftSelectWithIcon = ({
  items,
  name,
  label,
  size = "small",
  margin = "normal",
  required,
  fullWidth = true,
  sx,
  onChange,
  adornment,
  placeholder,
  disabled
}: ITextField) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue="" 
      render={({ field }) => (
        <TextField
          {...field}
          sx={{ ...sx }}
          size={size}
          select
          label={label}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          fullWidth={fullWidth}
          error={isError}
          margin={margin}
          InputProps={{
            startAdornment: adornment ? (
              <InputAdornment position="start">{adornment}</InputAdornment>
            ) : undefined,
          }}
          onChange={(e) => {
            field.onChange(e);
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          helperText={isError ? (formState.errors[name]?.message as string) : ""}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  zIndex: 1300, 
                },
              },
            },
          }}
          value={field.value || ""} 
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

export default CraftSelectWithIcon;
