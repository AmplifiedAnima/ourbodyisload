import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";

export const inputStylingSx = {
  width: "260px",
  padding: "10px 10px",
  marginBottom: "0px",

  "@media (max-width: 768px)": {
    width: "auto",
  },
  "@media (max-width: 280px)": {
    width: "auto",
    padding: "2px 0px",
    height: "60px",
  },
};

export const linkWithStylesSx = {
  fontFamily: "Poppins",
  background: "rgba(94, 0, 150, 1)",
  borderRadius: "4px",
  fontSize: "18px",
  padding: "0px",
  margin: "10px 0px",
  color: "white",
  textAlign: "center",

  "&:hover": {
    background: "black",
    color: "white",
  },
  "@media (max-width: 768px)": {
    fontSize: "16px",
    padding: "4px 12px",
  },
  "@media (max-width: 280px)": {
    fontSize: "12.5px",
    padding: "7px 5px",
    margin: "10px 2px",
  },
};

export const closeButtonStyles = {
  ...ButtonStylingForApp,
  marginRight: "auto",
  "&:hover": {
    background: "red",
    color: "white",
  },
  "@media (max-width: 280px)": {
    marginLeft: "0px",
    marginRight: "0px",
  },
};

export const loginButtonStyles = {
  ...ButtonStylingForApp,
  marginLeft: "auto",
  "&:hover": {
    background: "green",
    color: "white",
  },
  "@media (max-width: 280px)": {
    marginLeft: "5px",
    marginRight: "5px",
  },
};
