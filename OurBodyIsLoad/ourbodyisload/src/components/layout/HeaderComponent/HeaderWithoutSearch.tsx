import { Box, Typography } from "@mui/material";
import { HeaderContainerStyle, headerTypographyStyles } from "./headerStyles";
import { ImageOfLogo } from "./MenuDashboard/ImagesExported";
import { MenuDashboard } from "./MenuDashboard/MenuDashboard";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { NotificationHandlerDisplayComponent } from "../ErrorAndNotificationHandlers/NotificationHandlerDisplayComponent";
import LoginModal from "../LoginAndPasswordRecoveryComponents/LoginModal";

export const HeaderWithoutSearch = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const [openNotification, setIsOpenNotification] = useState(true);
  const { username, email, isLoggedIn, accessToken } = authState;

  useEffect(() => {
    console.log("Auth State ", { username, email, isLoggedIn, accessToken });
    if (authState.isLoggedIn) {
      setIsOpenNotification(true);
    } else {
      setIsOpenNotification(false);
    }
  }, [authState]);

  return (
    <>
      <Box sx={HeaderContainerStyle}>
        {authState.isLoggedIn ? <MenuDashboard /> : <LoginModal />}

        {authState.isLoggedIn && authState.username !== "" && (
          <NotificationHandlerDisplayComponent
            open={openNotification}
            handleClose={() => setIsOpenNotification(false)}
            notification={`you have logged in as : ${authState.username}`}
          />
        )}

        <Box sx={{ marginLeft: "auto" }}>
          <Typography sx={headerTypographyStyles}>
            अस्माकं शरीरम् प्रेम अस्ति
          </Typography>
        </Box>
        {ImageOfLogo}
      </Box>
    </>
  );
};
