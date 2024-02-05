import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateQuery } from "../../../store/slices/searchSlice";
import { MenuDashboard } from "./MenuDashboard/MenuDashboard";
import { HeaderContainerStyle } from "./headerStyles";
import { SearchInput } from "./SearchInput";
import { useState } from "react";

export const HeaderWithSearch = () => {
  const dispatch = useDispatch();

  const [searchingQuery, setSearchingQuery] = useState("");

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const rawValue = e.target.value;
    setSearchingQuery(rawValue);
  };

  const handleSearchSubmit = () => {
    dispatch({ type: updateQuery, payload: searchingQuery });
  };

  return (
    <>
      <Box sx={HeaderContainerStyle}>
        <MenuDashboard />
        <SearchInput
          handleInputValue={handleInputValue}
          onHandleSearchSubmit={handleSearchSubmit}
          searchQuery={searchingQuery}
        />
        <Box flexGrow={1} />
      </Box>
    </>
  );
};
