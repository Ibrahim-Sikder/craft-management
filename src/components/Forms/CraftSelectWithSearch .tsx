"use client"

import { useState, useMemo, useEffect } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { TextField, Box, Paper, List, ListItem, ClickAwayListener } from "@mui/material"

type Option = {
  title: string
}

type TProps = {
  name: string
  label?: string
  placeholder?: string
  options: Option[]
  margin?: "none" | "normal" | "dense"
  defaultValue?: string
}

const CraftSelectWithSearch = ({
  name,
  label = "Select Option",
  placeholder = "Search...",
  margin = "normal",
  options,
  defaultValue,
}: TProps) => {
  const { control } = useFormContext()
  const [search, setSearch] = useState(defaultValue || "")
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(defaultValue || "")

  useEffect(() => {
    setSelectedValue(defaultValue || "")
    setSearch(defaultValue || "")
  }, [defaultValue])

  const filteredOptions = useMemo(() => {
    return options.filter((opt) => opt.title.toLowerCase().includes(search.toLowerCase()))
  }, [search, options])

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      render={({ field, fieldState: { error } }) => {
        return (
          <Box sx={{ position: "relative" }}>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <Box>
                <TextField
                  label={label}
                  placeholder={placeholder}
                  fullWidth
                  value={selectedValue || search}
                  margin={margin}
                  onFocus={() => setOpen(true)}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setOpen(true)
                    field.onChange(e.target.value)
                    setSelectedValue(e.target.value)
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
                              field.onChange(option.title)
                              setSearch(option.title)
                              setOpen(false)
                              setSelectedValue(option.title)
                            }}
                            sx={{ cursor: "pointer" }}
                          >
                            {option.title}
                          </ListItem>
                        ))
                      ) : (
                        <ListItem sx={{ color: "text.disabled", cursor: "not-allowed" }} aria-disabled="true">
                          No match found
                        </ListItem>
                      )}
                    </List>
                  </Paper>
                )}
              </Box>
            </ClickAwayListener>
          </Box>
        )
      }}
    />
  )
}

export default CraftSelectWithSearch
