import React from "react";
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    SxProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TRadioOption = {
    label: string;
    value: string;
};

type TRadioProps = {
    name: string;
    label?: string;
    options: TRadioOption[];
    row?: boolean;
    size?: "small" | "medium";
    disabled?: boolean;
    defaultValue?: string;
    sx?: SxProps;
};

const CraftRadioGroup = ({
    name,
    label,
    options,
    row = true,
    size = "small",
    disabled,
    defaultValue,
    sx,
}: TRadioProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ""}
            render={({ field, fieldState: { error } }) => (
                <FormControl error={!!error} sx={sx} disabled={disabled}>
                    {label && <FormLabel>{label}</FormLabel>}

                    <RadioGroup {...field} row={row}>
                        {options.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio size={size} />}
                                label={option.label}
                            />
                        ))}
                    </RadioGroup>

                    {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
            )}
        />
    );
};

export default CraftRadioGroup;