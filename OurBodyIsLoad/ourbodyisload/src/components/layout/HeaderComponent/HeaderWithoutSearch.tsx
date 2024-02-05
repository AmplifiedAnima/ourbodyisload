import { Box, Typography } from "@mui/material";
import { HeaderContainerStyle } from "./headerStyles";
import { ImageOfLogo } from "./MenuDashboard/ImagesExported";
import { MenuDashboard } from "./MenuDashboard/MenuDashboard";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect } from "react";

export const HeaderWithoutSearch = () => {
  const authState = useSelector((state: RootState) => state.auth);

  const { username, email, isLoggedIn, accessToken } = authState;

  useEffect(() => {
    console.log("Auth State ", { username, email, isLoggedIn, accessToken });
  }, [authState]);

  return (
    <>
      <Box sx={HeaderContainerStyle}>
        <MenuDashboard />
        <Box sx={{ marginLeft: "auto" }}>
          <Typography
            sx={{
              fontFamily: "Aguafina Script, cursive",

              color: "white",
              textShadow: "3px 3px 0px black",
              letterSpacing: "2px",
              marginTop: "32px",
              fontSize: "30px",
              marginRight: "20px",

              "@media (max-width: 768px)": {
                marginLeft: "5px",
                marginTop: "26px",
                fontSize: "22px",
                marginRight: "15px",
              },
              "@media (max-width: 280px)": {
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
