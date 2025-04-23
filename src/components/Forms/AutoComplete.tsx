/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { SxProps } from "@mui/material";

type Option = {
  title: string;
};

type TStateProps = {
  name: string;
  label?: string;
  fullWidth?: boolean;
  sx?: SxProps;
  required?: boolean;
  options: Option[];
  size?: "small" | "medium";
  multiple?: boolean;
  freeSolo?: boolean;
  margin?: "none" | "normal" | "dense";
  defaultValue?: string[] | Option[];
  placeholder?: string;
};

const CraftAutoComplete = ({
  name,
  label = "Autocomplete",
  fullWidth = true,
  sx,
  required,
  options,
  margin = "normal",
  multiple = true,
  freeSolo = true,
  defaultValue = [],
  
  placeholder = "Select options",
}: TStateProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          multiple={multiple}
          freeSolo={freeSolo}
          options={options}
          getOptionLabel={(option: Option | string) =>
            typeof option === "string" ? option : option?.title || ""
          }
          value={field.value || defaultValue}
          renderTags={(value: readonly (Option | string)[], getTagProps) =>
            (Array.isArray(value) ? value : []).map((option: Option | string, index: number) => {
              const tagProps = getTagProps({ index });
              const { key, ...restTagProps } = tagProps;
              return (
                <Chip
                  key={typeof option === "string" ? option : option?.title || ""}
                  variant="outlined"
                  label={typeof option === "string" ? option : option?.title || ""}
                  {...restTagProps}
                />
              );
            })
          }

          onChange={(_, newValue) => {
            // Handle newValue as an array of strings or objects
            const updatedValue = Array.isArray(newValue)
              ? newValue.filter(v => v !== null && v !== undefined).map(v => typeof v === "string" ? v : v.title)
              : [];
            field.onChange(updatedValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              fullWidth={fullWidth}
              required={required}
              margin={margin}
              error={!!error}
              helperText={error?.message}
              variant="outlined"
              sx={sx}
            />
          )}
        />

      )}
    />
  );
};

export default CraftAutoComplete;


{/* <Grid item xs={12} md={2}>
  <CraftAutoComplete name="name"
    label="Name"
    options={[
      { title: "Alice" },
      { title: "Bob" },
      { title: "Charlie" },
      { title: "Diana" }
    ]}
  />

</Grid> */}