/* eslint-disable react/jsx-key */
"use client";

import React from "react";
import {
    Autocomplete,
    TextField,
    Chip,
    CircularProgress,

} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export type Option = {
    label?: string;
    title?: string;
    value: string;
};

type MultiSelectProps = {
    name: string;
    label?: string;
    options: Option[];
    placeholder?: string;
    isLoading?: boolean;
    disabled?: boolean;
};

const CategoryAutoComplete: React.FC<MultiSelectProps> = ({
    name,
    label,
    options,
    placeholder,
    isLoading,
    disabled = false,
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    multiple
                    options={options}
                    getOptionLabel={(option) =>
                        typeof option === "string"
                            ? option
                            : option.title || option.label || ""
                    }
                    value={field.value || []}
                    onChange={(_, data) => field.onChange(data)}
                    isOptionEqualToValue={(option, value) =>
                        typeof option === "string" || typeof value === "string"
                            ? option === value
                            : option.value === value.value
                    }
                    renderTags={(value: readonly (Option | string)[], getTagProps) =>
                        (Array.isArray(value) ? value : []).map((option, index) => {
                            const tagProps = getTagProps({ index });
                            const label =
                                typeof option === "string"
                                    ? option
                                    : option.title || option.label || "";
                            return (
                                <Chip
                                    {...tagProps}
                                    label={label}
                                />
                            );
                        })
                    }

                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            placeholder={placeholder}
                            disabled={disabled}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {isLoading && <CircularProgress size={20} />}
                                        {params.InputProps.endAdornment}
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

export default CategoryAutoComplete;
