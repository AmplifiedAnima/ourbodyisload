import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateQuery } from "../../../store/slices/searchSlice";
import { MenuDashboard } from "./MenuDashboard/MenuDashboard";
import { HeaderContainerStyle } from "./headerStyles";
import { SearchInput } from "./SearchInput";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import LoginModal from "../LoginAndPasswordRecoveryComponents/LoginModal";

export const HeaderWithSearch = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

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
        {authState.isLoggedIn ? <MenuDashboard /> : <LoginModal />}
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
