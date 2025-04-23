// CraftSwitch.tsx (Controlled version, without react-hook-form)

import { FormControlLabel, Switch } from "@mui/material";
import { ChangeEvent } from "react";

interface CraftSwitchProps {
  name: string;
  label: string;
  color?: "primary" | "secondary" | "default";
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CraftSwitch = ({
  name,
  label,
  color = "primary",
  checked,
  onChange,
}: CraftSwitchProps) => {
  return (
    <FormControlLabel
      control={
        <Switch
          name={name}
          checked={checked}
          onChange={onChange}
          color={color}
        />
      }
      label={label}
    />
  );
};

export default CraftSwitch;
