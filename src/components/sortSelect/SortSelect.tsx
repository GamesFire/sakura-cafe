import type { FC } from "react";
import { MenuItem, TextField } from "@mui/material";
import { SORT_OPTIONS } from "@/constants/SortOptions";

interface SortSelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SortSelect: FC<SortSelectProps> = ({ value, onChange }) => {
  return (
    <TextField
      select
      label="Сортування"
      value={value}
      onChange={onChange}
      className="max-md:w-full max-lg:w-3/4 w-1/3"
      sx={{
        backgroundColor: "rgba(244, 146, 159, 0.2)",
      }}
      SelectProps={{
        MenuProps: {
          PaperProps: {
            sx: {
              backgroundColor: "#FDB3BD",
            },
          },
        },
      }}
    >
      {SORT_OPTIONS.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SortSelect;
