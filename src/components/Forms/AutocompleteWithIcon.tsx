/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import { TextField, Autocomplete, Chip, InputAdornment, alpha } from "@mui/material"
import { SxProps } from "@mui/material/styles"

type Option = {
  id: string
  name: string
}

type TStateProps = {
  name: string
  label?: string
  fullWidth?: boolean
  sx?: SxProps
  required?: boolean
  options: Option[]
  size?: "small" | "medium"
  multiple?: boolean
  freeSolo?: boolean
  margin?: "none" | "normal" | "dense"
  defaultValue?: any
  placeholder?: string
  onInputChange?: (event: React.SyntheticEvent, value: string) => void
  onChange?: (event: React.SyntheticEvent, value: any) => void
  icon?: React.ReactNode
}

const CraftIntAutoCompleteWithIcon = ({
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
  onInputChange,
  onChange,
  icon,
}: TStateProps) => {
  const { control } = useFormContext()

  // Ensure that the correct label is displayed for each option
  const getOptionLabel = (option: any): string => {
    if (typeof option === "string") return option
    return option.name || option.label || "" // Adjust this to match your option structure
  }

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
          getOptionLabel={getOptionLabel}
          value={field.value || defaultValue} // Ensure value is correct format
          renderTags={(value: readonly any[], getTagProps) =>
            (Array.isArray(value) ? value : []).map((option: any, index: number) => {
              const tagProps = getTagProps({ index })
              const { key, ...restTagProps } = tagProps
              return (
                <Chip
                  key={key || index}
                  variant="outlined"
                  label={getOptionLabel(option)}
                  {...restTagProps}
                  sx={{
                    bgcolor: alpha("#1976d2", 0.1), // Adjust to your theme color
                    color: "#1976d2", // Adjust to your theme color
                    fontWeight: 500,
                  }}
                />
              )
            })
          }
          onChange={(event, newValue) => {
            // Ensure newValue is an array of selected option objects
            const processedValue = Array.isArray(newValue)
              ? newValue.map((item) => item.name || item) // Ensure proper processing
              : newValue

            field.onChange(processedValue)

            if (onChange) {
              onChange(event, newValue)
            }
          }}
          onInputChange={onInputChange}
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
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    {icon && (
                      <InputAdornment position="start">
                        {icon} {/* Dynamic icon */}
                      </InputAdornment>
                    )}
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  )
}

export default CraftIntAutoCompleteWithIcon
