import { Box, Button, Modal } from "@mui/material";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";

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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            bgcolor: "background.paper",
            overflowY: "auto",
            borderRadius: "8px",
          }}
        >
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
