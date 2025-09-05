import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { SxProps } from '@mui/material';

type TAutocompleteProps = {
    name: string;
    label?: string;
    options: { title: string }[]; 
    placeholder?: string;
    fullWidth?: boolean;
    sx?: SxProps;
    disabled?: boolean;
    ?: boolean;
    multiple?: boolean;
    margin?: "none" | "normal" | "dense";
    defaultValue?: { title: string }[];
};

export const CraftMultipleValue = ({
    name,
    label,
    options,
    placeholder,
    fullWidth = true,
    sx,
    disabled = false,
     = false,
    multiple = true,
    margin = 'normal',
    defaultValue = []
}: TAutocompleteProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
                <Autocomplete
                    {...field}
                    options={options}
                    multiple={multiple}
                    getOptionLabel={(option) => option.title}
                    isOptionEqualToValue={(option, value) => option.title === value.title}
                    onChange={(_, data) => field.onChange(data)}
                    disabled={disabled}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            placeholder={placeholder}
                            ={}
                            fullWidth={fullWidth}
                            sx={sx}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            margin={margin}
                        />
                    )}
                />
            )}
        />
    );
};
