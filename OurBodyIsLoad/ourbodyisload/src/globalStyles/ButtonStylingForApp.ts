export const ButtonStylingForApp = {
  background: "#6a1b9a",
  borderRadius: 1.5,
  border: 0,
  color: "white",
  padding: "5px 10px",
  margin: "10px 0px",
  textTransform: "none",
  fontWeight: "bold",
  "&:hover": {
    background: "black",
    color: "white",
  },
  "@media (max-width: 768px)": { fontSize: "12px" },
  "@media (max-width: 280px)": { fontSize: "8px" },
};
