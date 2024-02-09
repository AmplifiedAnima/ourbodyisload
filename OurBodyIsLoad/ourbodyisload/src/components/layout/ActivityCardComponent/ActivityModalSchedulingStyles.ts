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
