import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface CraftCheckboxProps {
  name: string;
  label: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}

const CraftCheckbox: React.FC<CraftCheckboxProps> = ({
  name,
  label,
  defaultChecked = false,
  disabled = false
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultChecked}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              disabled={disabled}
            />
          }
          label={label}
        />
      )}
    />
  );
};

export default CraftCheckbox;
