import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
// import {  useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import {
  SxProps,
  Typography,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ArrowRight } from "@mui/icons-material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface TMultiSelectProps {
  name: string;
  label: string;
  items: { category: string; subcategories?: string[] }[];
  size?: "small" | "medium";
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
}

const CraftMultiSelect: React.FC<TMultiSelectProps> = ({
  name,
  label,
  items,
  size = "small",

  fullWidth = true,
  sx,
}) => {
  // const theme = useTheme();
  const { control, setValue, getValues, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  const [expanded, setExpanded] = useState<string[]>([]);

  const handleCategoryClick = (category: string) => {
    const currentIndex = expanded.indexOf(category);
    const newExpanded = [...expanded];

    if (currentIndex === -1) {
      newExpanded.push(category);
    } else {
      newExpanded.splice(currentIndex, 1);
    }

    setExpanded(newExpanded);
  };

  const handleSubcategoryChange = (subCategory: string) => {
    const currentValues = getValues(name);
    const updatedValues = currentValues.includes(subCategory)
      ? currentValues.filter((value: string) => value !== subCategory)
      : [...currentValues, subCategory];

    setValue(name, updatedValues);
  };


  const isSubcategorySelected = (subCategory: string) => {
    return getValues(name)?.includes(subCategory);
  };

  return (
    <FormControl
      sx={{ width: fullWidth ? "100%" : 315, ...sx }}
      error={isError}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Select
            labelId={`${name}-label`}
            id={name}
            multiple
            size={size}
            {...field}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value: string) => (
                  <Chip
                    key={value}
                    label={value}
                    sx={{ padding: "2px" }}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {items.map((item) => (
              <React.Fragment key={item.category}>
                <MenuItem onClick={() => handleCategoryClick(item.category)}>
                  <ListItemIcon>
                    {expanded.includes(item.category) ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </ListItemIcon>
                  {item.category}
                </MenuItem>
                <Collapse in={expanded.includes(item.category)}>
                  <List component="div" disablePadding>
                    {item.subcategories?.map((sub) => (
                      <ListItem
                        key={sub}
                        component="li"
                        sx={{
                          pl: 4,
                          backgroundColor: isSubcategorySelected(sub)
                            ? "#F5F5F5"
                            : "transparent",
                          color: isSubcategorySelected(sub) ? "#1591A3" : "black",
                          marginBottom: isSubcategorySelected(sub) ? "3px" : "",
                          cursor: "pointer", // Add pointer cursor to indicate clickable
                        }}
                        onClick={() => handleSubcategoryChange(sub)}
                      >
                        <ListItemIcon>
                          <ArrowRight />
                        </ListItemIcon>
                        <ListItemText primary={sub} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </Select>
        )}
      />
      {isError && (
        <Typography
          component="small"
          sx={{ color: "error.main", fontSize: "10px", mt: 0.5 }}
        >
          {formState.errors[name]?.message as string}
        </Typography>
      )}
    </FormControl>
  );
};

export default CraftMultiSelect;
