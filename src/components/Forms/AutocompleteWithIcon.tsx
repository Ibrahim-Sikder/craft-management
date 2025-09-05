/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import {
  TextField,
  Autocomplete,
  Chip,
  InputAdornment,
  alpha,
  AutocompleteRenderOptionState,
} from "@mui/material"
import { SxProps } from "@mui/material/styles"

type Option = {
  id?: string
  value?: string
  name?: string
  label?: string
  capacity?: number
}

type TStateProps = {
  name: string
  label?: React.ReactNode;
  fullWidth?: boolean
  sx?: SxProps
  ?: boolean
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
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: Option,
    state: AutocompleteRenderOptionState
  ) => React.ReactNode
  renderTags?: (
    value: readonly Option[],
    getTagProps: (params: { index: number }) => Record<string, any>
  ) => React.ReactNode
}

const CraftIntAutoCompleteWithIcon = ({
  name,
  label = "Autocomplete",
  fullWidth = true,
  sx,
  ,
  options,
  margin = "normal",
  multiple = true,
  freeSolo = true,
  defaultValue = [],
  placeholder = "Select options",
  onInputChange,
  onChange,
  icon,
  renderOption,
  renderTags,
}: TStateProps) => {
  const { control } = useFormContext()

  const getOptionLabel = (option: any): string => {
    if (typeof option === "string") return option
    return option.name || option.label || "" // Default display label
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
          renderOption={renderOption}
          renderTags={
            renderTags ||
            ((value: readonly any[], getTagProps) =>
              value.map((option: any, index: number) => {
                const tagProps = getTagProps({ index })
                const { key, ...restTagProps } = tagProps
                return (
                  <Chip
                    key={key || index}
                    variant="outlined"
                    label={getOptionLabel(option)}
                    {...restTagProps}
                    sx={{
                      bgcolor: alpha("#1976d2", 0.1),
                      color: "#1976d2",
                      fontWeight: 500,
                    }}
                  />
                )
              }))
          }
          onChange={(event, newValue) => {
            const processedValue = Array.isArray(newValue)
              ? newValue
              : [newValue]

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
              ={}
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
                        {icon}
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
