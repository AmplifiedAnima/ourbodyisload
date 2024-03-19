import { Box, Button, Modal } from "@mui/material";
import { ButtonStylingForApp } from "../../../../globalStyles/ButtonStylingForApp";
import {
  assignExercises,
  movementPatterns,
} from "./utils/assignExercisesBasedOnMovementPatterns";
import {
  ChosenExercises,
  ExerciseHandlersInterface,
} from "../../../../interfaces/Exercise.interface";
import useExerciseHandlers from "./utils/useExerciseHandlers";

interface ModalForAutoCompletingTheTrainingPlanAssembleProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseHandlers: ExerciseHandlersInterface;
}

export const ModalForAutoCompletingTheTrainingPlanAssemble: React.FC<
  ModalForAutoCompletingTheTrainingPlanAssembleProps
> = ({ isOpen, onClose, exerciseHandlers }) => {
  useExerciseHandlers();

  const handleAssembleClick = () => {
    // Create a chosenExercises object with the provided exercises
    const chosenExercises: ChosenExercises = {
      timesAWeek: exerciseHandlers.daysAWeek,
      trainingPlans: Object.keys(exerciseHandlers.trainingDays).map((day) => ({
        day,
        mainExercises: exerciseHandlers.trainingDays[day].main, // Ensure non-empty arrays
        accessoryExercises: exerciseHandlers.trainingDays[day].accessory, // Ensure non-empty arrays
      })),
      periodization: exerciseHandlers.periodization,
    };

    // Assign exercises to training plans based on movement patterns
    const updatedChosenExercises = assignExercises(
      chosenExercises,
      movementPatterns,
      exerciseHandlers.exercises
    );

    // Perform further actions with the updated chosenExercises data, if needed
    console.log(updatedChosenExercises);
  };

  return (
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
          onClick={handleAssembleClick}
        >
          Assemble based on Movement pattern
        </Button>
        <Button
          sx={{ ...ButtonStylingForApp, width: "auto" }}
          onClick={handleAssembleClick}
        >
          Assemble based on bioenergetics
        </Button>
      </Box>
    </Modal>
  );
};
