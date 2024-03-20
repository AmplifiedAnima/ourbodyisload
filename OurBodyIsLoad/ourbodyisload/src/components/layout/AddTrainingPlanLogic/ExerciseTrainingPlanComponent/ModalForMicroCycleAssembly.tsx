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
import { TrainingDays } from "../../../../interfaces/TrainingPlan.interface";

interface ModalForMicroCycleAssemblyProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseHandlers: ExerciseHandlersInterface;
}

export const ModalForMicroCycleAssembly: React.FC<
  ModalForMicroCycleAssemblyProps
> = ({ isOpen, onClose, exerciseHandlers }) => {
  const handleAssembleClick = () => {
    const chosenExercises: ChosenExercises = {
      timesAWeek: exerciseHandlers.daysAWeek,
      trainingPlans: Object.keys(exerciseHandlers.trainingDays).map((day) => ({
        day,
        mainExercises: exerciseHandlers.trainingDays[day].main,
        accessoryExercises: exerciseHandlers.trainingDays[day].accessory,
      })),
      periodization: exerciseHandlers.periodization,
    };

    const updatedChosenExercises = assignExercises(
      chosenExercises,
      movementPatterns,
      exerciseHandlers
    );

    const updatedTrainingDays: TrainingDays = {};
    updatedChosenExercises.trainingPlans.forEach((plan) => {
      const { day, mainExercises, accessoryExercises } = plan;
      updatedTrainingDays[day] = {
        main: mainExercises,
        accessory: accessoryExercises,
      };
    });

    exerciseHandlers.setTrainingDays(updatedTrainingDays);
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
