import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const activityModalSchedulingDatePickerStyles = {
  "& .MuiInputBase-input": {},
  "& .MuiIconButton-root": {
    backgroundColor: "#6a1b9a",
    color: "white",
    margin: "2px",
    "&:hover": {
      background: "black",
    },
  },
  "& .MuiPickersDay-daySelected": {
    backgroundColor: "green",
    color: "white",
  },
  "& .MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-sizeMedium.MuiInputLabel-outlined.MuiFormLabel-colorPrimary":
    {
      color: "#6a1b9a",
    },
};

export const boxModalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  overflowY: "auto",
  borderRadius: "8px",
};
export const TypographyStylingInModal = {
  textAlign: "center",
  margin: "10px",
  background: "linear-gradient(to right, white 42%, rgba(94, 0, 140, 1) 90%)",
  fontFamily: 'Helvetica, "Trebuchet MS", Verdana, sans-serif',
  fontWeight: "bold",
  textShadow: "2px 2px 8px rgba(94, 0, 140, 0.2)",
  letterSpacing: "10px",
  "@media (max-width: 768px)": {
    fontSize: "18px",
    letterSpacing: "5px",
  },
};
export const trainingPlanModalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  overflowY: "auto",
  borderRadius: "8px",
}
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 25px;
  padding: 0px 20px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
export const StyledModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #f7f2fa;
  border-radius: 8px;
  padding: 25px;

  .MuiButton-root {
    margin-top: 10px;
    background-color: #6a1b9a;
    color: white;
    &:hover {
      background-color: #7e57c2;
    }
  }

  .MuiTextField-root {
    width: 100%;
  }
`;
