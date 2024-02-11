import { Box, Button, Modal } from "@mui/material";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { trainingPlanModalStyles } from "./ActivityModalAndSchedulingStyles";

interface TrainingPlanModalProps {
  open: boolean;
  handleClose: () => void;
  trainingPlan: string;
}

export const TrainingPlanModal: React.FC<TrainingPlanModalProps> = ({
  open,
  handleClose,
}) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={trainingPlanModalStyles}>
          <Button
            onClick={handleClose}
            sx={{
              ...ButtonStylingForApp,
              margin: "20px",
              "&:hover": {
                background: "red",
              },
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};
