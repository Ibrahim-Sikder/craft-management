import * as React from "react";
import { Autocomplete, TextField, SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TTagsInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  sx?: SxProps;
  required?: boolean;
  disabled?: boolean;
  options?: string[];
};

const CraftTagsInput = ({
  name,
  label,
  placeholder = "Type and press enter",
  sx,
  required,
  disabled,
  options = [],
}: TTagsInputProps) => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            multiple
            size="small"
            freeSolo
            options={options} // Predefined options for tags
            value={field.value || []}
            onChange={(event, newValue) => {
              field.onChange(newValue);
            }}
            sx={{
              marginTop: "12px",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                variant="outlined"
                disabled={disabled}
                error={!!error}
                helperText={error ? error.message : ""}
                sx={sx}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
    </>
  );
};

export default CraftTagsInput;
