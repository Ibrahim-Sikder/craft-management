import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { SxProps } from '@mui/material';

type TAutocompleteControllerProps = {
    name: string;
    options: { title: string }[];
    defaultValue?: string[];
    label: string,
    placeholder?: string,
    fullWidth?: boolean;
    sx?: SxProps;
    disabled?: boolean;
    ?: boolean;
    multiple?: boolean;
    margin?: "none" | "normal" | "dense";
    size?: 'small' | 'medium'
};

export const CraftMultipleValue = ({
    name,
    options,
    defaultValue = [],
    label,
    placeholder,
    fullWidth = true,
    sx,
    size = 'small',
    margin = 'normal',
}: TAutocompleteControllerProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
                <Autocomplete
                    {...field}
                    multiple
                    freeSolo
                    options={options.map((option) => option.title)}
                    value={field.value || []}
                    onChange={(_, newValue) => field.onChange(newValue)}
                    renderTags={(value, getTagProps) =>
                        value.map((option: string, index: number) => {
                            const { key, ...tagProps } = getTagProps({ index });
                            return (
                                <Chip

                                    label={option}
                                    key={key}
                                    {...tagProps}
                                />
                            );
                        })
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={sx}
                            size={size}
                            margin={margin}
                            fullWidth={fullWidth}
                            label={label}
                            placeholder={placeholder}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            )}
        />
    );
};
