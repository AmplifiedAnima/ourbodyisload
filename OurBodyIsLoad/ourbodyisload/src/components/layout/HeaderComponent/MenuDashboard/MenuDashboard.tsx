import { Box, Button, Typography, List, ListItem, Avatar } from "@mui/material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import { performLogout } from "../../../../store/slices/authSlice";
import { AuthState } from "../../../../interfaces/auth.interface";
import { ButtonStylingForApp } from "../../../../globalStyles/ButtonStylingForApp";
import { useDispatch } from "react-redux";
import { ArrowBack } from "@mui/icons-material";
import {
  itemStyles,
  fontStyling,
  boxMenuStyles,
  arrowBackStyles,
  ButtonHandleOpenSideBarStyles,
  getDashboardBoxStyle,
} from "./menuDashboardStyles";
import { menuBurgerIcon } from "./ImagesExported";

export const MenuDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isRegistrationPage = location.pathname === "/registration-page";
  const isAboutCreatorPage = location.pathname === "/about-creator";

  const authState = useSelector<RootState, AuthState>((state) => state.auth);
  const { username, isLoggedIn, avatarImageUrl } = authState;
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenSideBar = () => {
    setIsOpen(!isOpen);
  };

  const handleHomeNavigation = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(performLogout());
    handleHomeNavigation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box>
        <Button
          onClick={
            isRegistrationPage || isAboutCreatorPage
              ? handleHomeNavigation
              : handleOpenSideBar
          }
        >
          {menuBurgerIcon}
        </Button>

        {isOpen && (
          <Box sx={getDashboardBoxStyle(isOpen)}>
            <Button
              onClick={handleOpenSideBar}
              sx={ButtonHandleOpenSideBarStyles}
            >
              <ArrowBack sx={arrowBackStyles} />
              <Box
                sx={{
                  paddingTop: "20px",
                  "@media (max-width: 768px)": {
                    marginLeft: "5px",
                  },
                }}
              >
                <Typography
                  sx={{ paddingLeft: "5px", ...fontStyling, color: "purple" }}
                >
                  Hide menu
                </Typography>
              </Box>
            </Button>
            <Box
              sx={{
                ...itemStyles,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "@media(max-width:768px)": {
                  margin: "0px 0px",
                },
                "@media(max-width:280px)": {
                  margin: "20px 0px",
                },
              }}
            >
              {isLoggedIn && (
                <Avatar
                  src={avatarImageUrl}
                  alt=""
                  sx={{
                    width: "100px",
                    height: "100px",
                  }}
                />
              )}
            </Box>
            <Box sx={boxMenuStyles}>
              <List>
                <>
                  <Typography
                    sx={{
                      ...fontStyling,
                      paddingLeft: "24px",
                      marginBottom: "13px",
                      fontSize: "14px",
                      color: "purple",
                    }}
                  >
                    username : {username}
                  </Typography>
                  <ListItem>
                    <Link to="/">
                      <Button>
                        <Typography sx={fontStyling}>
                          Our Body Is Love
                        </Typography>
                      </Button>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/exercise-library">
                      <Button>
                        <Typography sx={fontStyling}>
                          Exercise Library
                        </Typography>
                      </Button>
                    </Link>
                  </ListItem>
                  {/* To be written */}
                  {/* <ListItem>
                    <Link to="/blog-post">
                      <Button>
                        <Typography sx={fontStyling}>Blogpost</Typography>
                      </Button>
                    </Link>
                  </ListItem> */}
                  <ListItem>
                    <Link to="/profile">
                      <Button>
                        <Typography sx={fontStyling}>Profile</Typography>
                      </Button>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/about-creator">
                      <Button>
                        <Typography sx={fontStyling}>About Creator</Typography>
                      </Button>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Button
                      sx={{
                        ...ButtonStylingForApp,
                        margin: "auto",
                        padding: 1,
                        "&:hover": {
                          background: "red",
                          color: "white",
                        },
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </ListItem>
                </>
              </List>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
