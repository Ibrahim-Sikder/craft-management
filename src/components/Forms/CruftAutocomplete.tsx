/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { Controller, useFormContext } from "react-hook-form"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import Chip from "@mui/material/Chip"
import type { SxProps } from "@mui/material"

type Option =
  | {
      title: string
    }
  | {
      value: string
      label: string
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
}


const CraftIntAutoComplete = ({
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
}: TStateProps) => {
  const { control } = useFormContext()

  // Helper function to get the display value from an option
  const getOptionLabel = (option: any): string => {
    if (!option) return ""
    if (typeof option === "string") return option
    if (option.title) return option.title
    if (option.label) return option.label
    if (option.value) return option.value
    return ""
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
          value={field.value || defaultValue}
          renderTags={(value: readonly any[], getTagProps) =>
            (Array.isArray(value) ? value : []).map((option: any, index: number) => {
              const tagProps = getTagProps({ index })
              const { key, ...restTagProps } = tagProps
              return <Chip key={key || index} variant="outlined" label={getOptionLabel(option)} {...restTagProps} />
            })
          }
          onChange={(event, newValue) => {
            // Handle custom onChange if provided
            if (onChange) {
              onChange(event, newValue)
            }

            // Process the value for React Hook Form
            const processedValue = Array.isArray(newValue)
              ? newValue.map((item) => {
                  if (typeof item === "string") return item
                  if (item && typeof item === "object") {
                    return item.title || item.value || item
                  }
                  return item
                })
              : newValue

            field.onChange(processedValue)
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
            />
          )}
        />
      )}
    />
  )
}

export default CraftIntAutoComplete
