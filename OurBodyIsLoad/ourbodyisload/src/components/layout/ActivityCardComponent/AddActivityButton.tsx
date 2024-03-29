import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";

export const AddActivityButton: React.FC<{ openModal: () => void }> = ({
  openModal,
}) => {
  return (
    <>
      <Button
        onClick={openModal}
        sx={ButtonStylingForApp}
        aria-label="Add Activity"
      >
        <AddIcon /> ADD ACTIVITY
      </Button>
    </>
  );
};
