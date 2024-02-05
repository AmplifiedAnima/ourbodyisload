
export const itemStyles = {
  paddingLeft: "200px",
};

export const fontStyling = {
  fontFamily: "Source Sans Pro",
  letterSpacing: "1px",
  fontSize: "15px",
  fontWeight: "bold",
  color: "black",
  "@media (max-width: 280px)": {
    fontSize: "12px",
  },
};

export const boxMenuStyles = {
  padding: "0px 50px",
  display: "flex",
  justifyContent: "right",
  width: "340px",
  "@media (max-width: 768px)": {
    width: "290px",
  },
  "@media (max-width: 280px)": {
    width: "340px",
    padding: "0px 60px",
  },
};
export const arrowBackStyles = {
  color: "black",
  paddingTop: "20px",
  paddingLeft: "30px",
  fontSize: "20px",
};
export const ButtonHandleOpenSideBarStyles = {
  ...itemStyles,
  paddingTop: "25px",
  "@media (max-width: 768px)": {
    paddingLeft: "135px",
    paddingTop: "15px",
    textDecoration: "none",
  },
  "@media (max-width: 280px)": {
    paddingLeft: "255px",
    textDecoration: "none",
  },
};

export const getDashboardBoxStyle = (isOpen: boolean) => ({
  position: "fixed",
  top: 0,
  right: isOpen ? "calc(100% - 200px)" : "100%",
  background: "white",
  width: "400px",
  height: "100%",
  zIndex: 10000,
  color: "white",
  transition: "left 3s ease",
  "@media (max-width: 768px)": {
    right: isOpen ? "calc(100% - 260px)" : "100%",
    width: "400px",
    background: "white",
  },
  "@media (max-width: 280px)": {
    right: isOpen ? "calc(100% - 150px)" : "100%",
  },
});
