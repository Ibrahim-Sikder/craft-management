/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  TextField,
  Autocomplete,
  Chip,
  InputAdornment,
  alpha,
  AutocompleteRenderOptionState,
  AutocompleteProps,
} from "@mui/material";
import { SxProps } from "@mui/material/styles";


type Option = {
  id?: string;
  value?: string;
  name?: string;
  label?: string;
  capacity?: number;
  [key: string]: any;
};
type TStateProps = {
  name: string;
  label?: React.ReactNode;
  fullWidth?: boolean;
  sx?: SxProps;
  helperText?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  options: Option[];
  size?: "small" | "medium";
  multiple?: boolean;
  freeSolo?: boolean;
  margin?: "none" | "normal" | "dense";
  defaultValue?: any;
  placeholder?: string;
  onInputChange?: (event: React.SyntheticEvent, value: string) => void;
  onChange?: (event: React.SyntheticEvent, value: any) => void;
  icon?: React.ReactNode;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: Option,
    state: AutocompleteRenderOptionState
  ) => React.ReactNode;
  renderTags?: (
    value: readonly Option[],
    getTagProps: (params: { index: number }) => Record<string, any>
  ) => React.ReactNode;
  isOptionEqualToValue?: (option: any, value: any) => boolean;
  disableClearable?: boolean;
  readOnly?: boolean;
  filterOptions?: (options: Option[], state: any) => Option[];
  getOptionDisabled?: (option: Option) => boolean;
  loading?: boolean;
  loadingText?: React.ReactNode;
  noOptionsText?: React.ReactNode;
  autoHighlight?: boolean;
  autoSelect?: boolean;
  blurOnSelect?: boolean;
  clearOnBlur?: boolean;
  clearOnEscape?: boolean;
  selectOnFocus?: boolean;
  limitTags?: number;
  open?: boolean;
  onOpen?: (event: React.SyntheticEvent) => void;
  onClose?: (event: React.SyntheticEvent) => void;
} & Partial<AutocompleteProps<any, boolean, boolean, boolean>>;

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
  disabled = false,
  placeholder = "Select options",
  onInputChange,
  onChange,
  icon,
  renderOption,
  renderTags,
  size = "small",
  isOptionEqualToValue,
  disableClearable = false,
  readOnly = false,
  filterOptions,
  getOptionDisabled,
  loading = false,
  loadingText = "Loading...",
  noOptionsText = "No options",
  autoHighlight = true,
  autoSelect = false,
  blurOnSelect = false,
  clearOnBlur = true,
  clearOnEscape = false,
  selectOnFocus = true,
  limitTags = -1,
  open,
  onOpen,
  onClose,
  ...otherProps // Capture any other Autocomplete props
}: TStateProps) => {
  const { control } = useFormContext();

  const getOptionLabel = (option: any): string => {
    if (typeof option === "string") return option;
    if (typeof option === "object" && option !== null) {
      return option.label || option.name || option.value || "";
    }
    return String(option);
  };

  // Helper function to safely get option value for comparison
  const defaultIsOptionEqualToValue = (option: any, value: any): boolean => {
    if (!option || !value) return false;

    // Handle string comparisons
    if (typeof option === 'string' && typeof value === 'string') {
      return option === value;
    }

    // Handle object comparisons
    const optValue = option.value || option.id || option.label || option.name;
    const valValue = value.value || value.id || value.label || value.name;

    // If both have values, compare them
    if (optValue !== undefined && valValue !== undefined) {
      return String(optValue) === String(valValue);
    }

    // Fallback to object reference equality
    return option === value;
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          {...otherProps} // Spread any additional Autocomplete props
          multiple={multiple}
          freeSolo={freeSolo}
          options={options}
          getOptionLabel={getOptionLabel}
          disableClearable={disableClearable}
          readOnly={readOnly}
          value={field.value !== undefined ? field.value : (multiple ? [] : null)}
          renderOption={renderOption}
          disabled={disabled || readOnly}
          isOptionEqualToValue={isOptionEqualToValue || defaultIsOptionEqualToValue}
          filterOptions={filterOptions}
          getOptionDisabled={getOptionDisabled}
          loading={loading}
          loadingText={loadingText}
          noOptionsText={noOptionsText}
          autoHighlight={autoHighlight}
          autoSelect={autoSelect}
          blurOnSelect={blurOnSelect}
          clearOnBlur={clearOnBlur}
          clearOnEscape={clearOnEscape}
          selectOnFocus={selectOnFocus}
          limitTags={limitTags}
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          renderTags={
            renderTags ||
            ((value: readonly any[], getTagProps) =>
              value.map((option: any, index: number) => {
                const tagProps = getTagProps({ index });
                const { key, ...restTagProps } = tagProps;
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
                );
              }))
          }
          onChange={(event, newValue) => {
            field.onChange(newValue);
            if (onChange) {
              onChange(event, newValue);
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
              size={size}
              error={!!error}
              helperText={error?.message}
              variant="outlined"
              sx={sx}
              InputProps={{
                ...params.InputProps,
                readOnly: readOnly,
                startAdornment: (
                  <>
                    {icon && (
                      <InputAdornment position="start">{icon}</InputAdornment>
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
  );
};

export default CraftIntAutoCompleteWithIcon;

