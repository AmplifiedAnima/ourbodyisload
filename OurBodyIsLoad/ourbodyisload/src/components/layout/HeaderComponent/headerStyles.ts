export const HeaderContainerStyle = {
  background:
    "linear-gradient(to right, black 12%, rgba(94, 0, 140, 1) 50%,white 99% )",
  display: "flex",
  alignItems: "left",
  margin: "0 auto",
  paddingLeft: "0px",
  "@media (max-width: 768px)": {
    background:
      "linear-gradient(to right, black 25%, rgba(94, 0, 140, 1) 60%,white 99% )",
    paddingLeft: "5px",
  },
  "@media (max-width: 280px)": {
    background:
      "linear-gradient(to right, black 15%, rgba(94, 0, 140, 1) 40%,white 99% )",
    paddingLeft: "5px",
  },
};
export const headerTypographyStyles = {
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
    fontSize: "18px",
    marginRight: "10px",
  },
  "@media (max-width: 280px)": {
    display: "none",
  },
};
