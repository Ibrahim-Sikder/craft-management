import React, { useState, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
    TextField,
    Box,
    Paper,
    List,
    ListItem,
    ClickAwayListener,
} from "@mui/material";

type Option = {
    title: string;
};

type TProps = {
    name: string;
    label?: string;
    placeholder?: string;
    options: Option[];
    margin?: "none" | "normal" | "dense"
};

const CraftSelectWithSearch = ({
    name,
    label = "Select Option",
    placeholder = "Search...",
    margin = 'normal',
  options,
}: TProps) => {
    const { control } = useFormContext();
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const filteredOptions = useMemo(() => {
        return options.filter((opt) =>
            opt.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, options]);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
                <Box sx={{ position: "relative" }}>
                    <ClickAwayListener onClickAway={() => setOpen(false)}>
                        <Box>
                            <TextField
                                label={label}
                                placeholder={placeholder}
                                fullWidth
                                value={search}
                                margin={margin}
                                onFocus={() => setOpen(true)}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setOpen(true);
                                }}
                                error={!!error}
                                helperText={error?.message}
                            />
                            {open && (
                                <Paper
                                    sx={{
                                        position: "absolute",
                                        zIndex: 10,
                                        width: "100%",
                                        maxHeight: 200,
                                        overflowY: "auto",
                                    }}
                                >
                                    <List>
                                        {filteredOptions.length > 0 ? (
                                            filteredOptions.map((option, index) => (
                                                <ListItem
                                                    key={index}
                                                    component="div"
                                                    onClick={() => {
                                                        field.onChange(option.title);
                                                        setSearch(option.title);
                                                        setOpen(false);
                                                    }}
                                                    sx={{ cursor: "pointer" }}
                                                >
                                                    {option.title}
                                                </ListItem>
                                            ))
                                        ) : (
                                            <ListItem
                                                sx={{ color: "text.disabled", cursor: "not-allowed" }}
                                                aria-disabled="true"
                                            >
                                                No match found
                                            </ListItem>
                                        )}
                                    </List>
                                </Paper>
                            )}
                        </Box>
                    </ClickAwayListener>
                </Box>
            )}
        />
    );
};

export default CraftSelectWithSearch;
