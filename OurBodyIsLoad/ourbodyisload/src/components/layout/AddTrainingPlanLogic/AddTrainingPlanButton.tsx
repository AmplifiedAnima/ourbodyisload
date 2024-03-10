import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";

export const AddTrainingPlanButton: React.FC<{ openModal: () => void }> = ({
  openModal,
}) => {
  return (
    <>
      <Button
        onClick={openModal}
        sx={{ ...ButtonStylingForApp, margin: "0px 5px" }}
        aria-label="Add Activity"
      >
        <AddIcon />
        ADD TRAINING PLAN
      </Button>
    </>
  );
};
