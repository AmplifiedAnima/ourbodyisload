import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateQuery } from "../../../store/slices/searchSlice";
import { MenuDashboard } from "./MenuDashboard/MenuDashboard";
import { HeaderContainerStyle, headerTypographyStyles } from "./headerStyles";
import { SearchInput } from "./SearchInput";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import LoginModal from "../LoginAndPasswordRecoveryComponents/LoginModal";
import { ImageOfLogo } from "./MenuDashboard/ImagesExported";

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
        <Box sx={{ marginLeft: "auto" }}>
          <Typography
            sx={{
              ...headerTypographyStyles,
              "@media(max-width:768px)": {
                display: "none",
              },
            }}
          >
            अस्माकं शरीरम् प्रेम अस्ति
          </Typography>
        </Box>
        {ImageOfLogo}
      </Box>
    </>
  );
};
