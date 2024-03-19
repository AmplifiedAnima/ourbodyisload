import React, { useEffect, useState } from "react";
import { Modal, Button, Box, Grid, Typography } from "@mui/material";
import { ChosenExercises } from "../../../../interfaces/Exercise.interface";
import { ButtonStylingForApp } from "../../../../globalStyles/ButtonStylingForApp";
import ExerciseTypeModal from "./ExerciseTypeModal";
import GridWithOptionsForPeriodizationModalTemplate from "./GridWithOptionsForPeriodizationModalTemplate";
import useExerciseHandlers from "./utils/useExerciseHandlers";
import { ModalForAutoCompletingTheTrainingPlanAssemble } from "./ModalForCycleAssembly";
import { TablesTemplateComponent } from "../TablesTemplateComponent";

interface ModalWithExercisesChoiceProps {
  isOpen: boolean;
  onClose: () => void;
  onChooseExercises: (chosenExercises: ChosenExercises) => void;
}

export const ModalForCreatingPeriodizedTemplate: React.FC<
  ModalWithExercisesChoiceProps
> = ({ isOpen, onClose, onChooseExercises }) => {
  const exerciseHandlers = useExerciseHandlers();
  const [isAssemblyModalOpen, setIsAssemblyModalOpen] = useState(false);

  const handleSearchSubmit = () => {
    exerciseHandlers.setSearchingQuery(exerciseHandlers.searchingQuery);
  };

  useEffect(() => {
    console.log(`days a week `, exerciseHandlers.daysAWeek);
    {
      Object.keys(exerciseHandlers.trainingDays).map((day) =>
        console.log(
          `Main Exercise for day ${day}`,
          exerciseHandlers.trainingDays[day].main,
          `accesory exercise for ${day}`,
          exerciseHandlers.trainingDays[day].accessory
        )
      );
    }
  }, [exerciseHandlers.daysAWeek, exerciseHandlers.trainingDays]);

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
        <Grid container>
          <Grid item md={5}>
            <Button
              sx={{
                ...ButtonStylingForApp,
                mt: 2,
              }}
              onClick={() => setIsAssemblyModalOpen(true)}
            >
              Assemble training cycle
            </Button>
            {isAssemblyModalOpen && (
              <ModalForAutoCompletingTheTrainingPlanAssemble
                isOpen={isAssemblyModalOpen}
                onClose={() => setIsAssemblyModalOpen(false)}
                exerciseHandlers={exerciseHandlers}
              />
            )}

            <Typography variant="h6">Template</Typography>
            <Box
              sx={{
                height: "550px",
                overflow: "auto",
                margin: "5px 10px",
                "@media(max-width:768px)": {
                  height: "400px",
                  width: "100%",
                  margin: "0px 0px",
                },
              }}
            >
              {Object.keys(exerciseHandlers.trainingDays).map((day) => (
                <TablesTemplateComponent
                  key={day}
                  dayLabel={day}
                  mainExercises={exerciseHandlers.trainingDays[day].main}
                  accessoryExercises={
                    exerciseHandlers.trainingDays[day].accessory
                  }
                />
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
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
