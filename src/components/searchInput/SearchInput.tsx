import type { FC } from "react";
import { InputAdornment, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <InputBase
      className="max-md:w-full max-lg:w-3/4 w-1/2 border-2 bg-[#FDE9EC] rounded-2xl px-4 py-1 max-lg:mb-10 shadow-md"
      placeholder="Пошук за назвою"
      type="search"
      value={value}
      onChange={onChange}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      sx={{
        "&:focus-within": {
          borderColor: "#FDB3BD",
        },
      }}
    />
  );
};

export default SearchInput;
