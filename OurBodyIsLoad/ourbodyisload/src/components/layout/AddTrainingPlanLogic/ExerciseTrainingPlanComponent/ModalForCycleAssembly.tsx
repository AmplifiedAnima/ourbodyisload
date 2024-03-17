import { Box, Button, Modal } from "@mui/material";
import { ButtonStylingForApp } from "../../../../globalStyles/ButtonStylingForApp";
import { TrainingPlanInterface } from "../../../../interfaces/TrainingPlan.interface";
import { movementPatterns } from "./utils/assignExercisesBasedOnMovementPatterns";
import { assignExercises } from "./utils/assignExercisesBasedOnMovementPatterns";

interface ModalForCycleAssemblyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalForCycleAssembly: React.FC<ModalForCycleAssemblyProps> = ({
  isOpen,
  onClose,
}) => {
  //choose movement patterns
  // choose small muscles exercises
  //main can be 3 exercises
  // a) squat/lunge
  // b) hinge/uni hinge
  // c) press/push

  const trainingPlanExample: { [key: string]: TrainingPlanInterface } = {
    day1: {
      _id: "1",
      mainExercises: [
        { _id: "1a", movementPattern: "" },
        { _id: "1b", movementPattern: "" },
      ],
      accessoryExercises: [
        { _id: "1c", movementPattern: "" },
        { _id: "1d", movementPattern: "" },
        { _id: "1e", movementPattern: "" },
        { _id: "1c", movementPattern: "" },
        { _id: "1d", movementPattern: "" },
        { _id: "1e", movementPattern: "" },
      ],
    },
    day2: {
      _id: "2",
      mainExercises: [
        { _id: "2a", movementPattern: "" },
        { _id: "2b", movementPattern: "" },
      ],
      accessoryExercises: [
        { _id: "2c", movementPattern: "" },
        { _id: "2d", movementPattern: "" },
        { _id: "2e", movementPattern: "" },
        { _id: "2c", movementPattern: "" },
        { _id: "2d", movementPattern: "" },
        { _id: "2e", movementPattern: "" },
      ],
    },
    day3: {
      _id: "3",
      mainExercises: [
        { _id: "3a", movementPattern: "" },
        { _id: "3b", movementPattern: "" },
      ],
      accessoryExercises: [
        { _id: "3c", movementPattern: "" },
        { _id: "3d", movementPattern: "" },
        { _id: "3e", movementPattern: "" },
        { _id: "3c", movementPattern: "" },
        { _id: "3d", movementPattern: "" },
        { _id: "3e", movementPattern: "" },
      ],
    },
  };

  // Example usage:

  const updatedTrainingPlan = assignExercises(
    trainingPlanExample,
    movementPatterns
  );

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            width: "800px",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ ...ButtonStylingForApp, width: "auto" }}
            onClick={() => {
              console.log(updatedTrainingPlan);
            }}
          >
            assemble based on Movement pattern
          </Button>
        </Box>
      </Modal>
    </>
  );
};
