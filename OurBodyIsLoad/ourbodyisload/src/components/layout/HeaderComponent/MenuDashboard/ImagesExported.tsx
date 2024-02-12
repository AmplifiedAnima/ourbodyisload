import { styled } from "@mui/material/styles";
import menuBurger from "../../../../static/images/menu-burger.png";
import wolfLogo from "../../../../static/images/WolfLogo.png";
import loginArrowImage from "../../../../static/images/enterArrow.png";
const StyledImg = styled("img")({});

export const ImageOfLogo = (
  <StyledImg
    src={wolfLogo}
    alt="my Image"
    sx={{
      width: 100,
      height: 100,
      "@media (max-width: 768px)": {
        marginTop: "0px",
        width: 75,
        height: 75,
      },
      "@media (max-width: 280px)": {
        marginTop: "5px",
      },
    }}
  />
);

export const ImageOfLoginArrow = (
  <StyledImg
    src={loginArrowImage}
    alt="my Image"
    sx={{
      marginTop: "3px",
      width: 80,
      height: 80,
      "@media (max-width: 768px)": {
        marginTop: "3px",
        width: 55,
        height: 55,
      },
      "@media (max-width: 280px)": {
        marginTop: "5px",
      },
    }}
  />
);
export const menuBurgerIcon = (
  <StyledImg
    src={menuBurger}
    alt="my Image"
    sx={{
      width: 80,
      height: 80,
      paddingTop: "4px",
      "@media (max-width: 768px)": {
        width: 60,
        height: 60,
        paddingTop: "2px",
      },
    }}
  />
);
