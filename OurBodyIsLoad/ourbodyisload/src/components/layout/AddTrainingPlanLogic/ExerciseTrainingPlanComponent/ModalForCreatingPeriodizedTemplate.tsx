import React from "react";
import { Modal, Button, Box } from "@mui/material";
import { ChosenExercises } from "../../../../interfaces/Exercise.interface";
import { ButtonStylingForApp } from "../../../../globalStyles/ButtonStylingForApp";
import ExerciseTypeModal from "./ExerciseTypeModal";
import GridWithOptionsForPeriodizationModalTemplate from "./GridWithOptionsForPeriodizationModalTemplate";
import useExerciseHandlers from "./utils/useExerciseHandlers";

interface ModalWithExercisesChoiceProps {
  isOpen: boolean;
  onClose: () => void;
  onChooseExercises: (chosenExercises: ChosenExercises) => void;
}

export const ModalForCreatingPeriodizedTemplate: React.FC<
  ModalWithExercisesChoiceProps
> = ({ isOpen, onClose, onChooseExercises }) => {
  const exerciseHandlers = useExerciseHandlers();

  const handleSearchSubmit = () => {
    exerciseHandlers.setSearchingQuery(exerciseHandlers.searchingQuery);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          bgcolor: "background.paper",
          p: 4,
          overflowY: "auto",
        }}
      >
        <GridWithOptionsForPeriodizationModalTemplate
          exerciseHandlers={exerciseHandlers}
          handleSearchSubmit={handleSearchSubmit}
          exercises={exerciseHandlers.exercises}
        />
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-start" }}>
          <Button
            variant="contained"
            onClick={() =>
              exerciseHandlers.handleChooseExercises(onChooseExercises, onClose)
            }
            sx={{ ...ButtonStylingForApp, ml: 1 }}
          >
            Choose Selected
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ ...ButtonStylingForApp, ml: 1 }}
          >
            Cancel
          </Button>
        </Box>
        <ExerciseTypeModal
          open={exerciseHandlers.exerciseTypeModalOpen}
          onClose={exerciseHandlers.handleCloseExerciseTypeModal}
          selectedExercise={exerciseHandlers.selectedExercise}
          sets={exerciseHandlers.sets}
          reps={exerciseHandlers.reps}
          intensity={exerciseHandlers.intensity}
          handleSetsChange={exerciseHandlers.handleSetsChange}
          handleRepsChange={exerciseHandlers.handleRepsChange}
          handleIntensityChange={exerciseHandlers.handleIntensityChange}
          handleSetExerciseType={exerciseHandlers.handleSetExerciseType}
        />
      </Box>
    </Modal>
  );
};
