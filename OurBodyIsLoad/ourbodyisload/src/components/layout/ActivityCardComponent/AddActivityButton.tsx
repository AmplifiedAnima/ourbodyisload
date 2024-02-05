import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";

interface AddActivityButtonProps {
  OpenModal: () => void;
}

export const AddActivityButton: React.FC<AddActivityButtonProps> = ({
  OpenModal,
}) => {
  return (
    <>
      <Button
        onClick={OpenModal}
        sx={ButtonStylingForApp}
        aria-label="Add Activity"
      >
        <AddIcon /> Add Activity
      </Button>
    </>
  );
};

export const AddTrainingPlanButton: React.FC<AddActivityButtonProps> = ({
  OpenModal,
}) => {
  return (
    <>
      <Button
        onClick={OpenModal}
        sx={{ ...ButtonStylingForApp, margin: "0px 5px" }}
        aria-label="Add Activity"
      >
        <AddIcon /> Add training plan
      </Button>
    </>
  );
};
