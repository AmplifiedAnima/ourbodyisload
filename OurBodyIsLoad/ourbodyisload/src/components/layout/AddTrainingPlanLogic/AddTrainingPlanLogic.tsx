import { Box, Button, Grid, Typography } from "@mui/material";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { useEffect, useState } from "react";
import { trainingPlanInterface } from "../../../interfaces/trainingPlan.interface";
import { exerciseBlueprintsInterface } from "../../../interfaces/exercise.interface";
import { cycleInterface } from "../../../interfaces/cycle.interface";
import { ModalForCreatingPeriodizedData } from "./ExerciseTrainingPlanComponent/ModalForCreatingPeriodizedData";
import { TablesTemplateComponent } from "./TablesTemplateComponent";
import ErrorHandlerDisplayComponent from "../ErrorAndNotificationHandlers/ErrorHandlerDisplayComponent";
import { NotificationHandlerDisplayComponent } from "../ErrorAndNotificationHandlers/NotificationHandlerDisplayComponent";

export const AddTrainingPlanLogic = () => {
  const [periodizedTraining, savePeriodizedTraining] =
    useState<cycleInterface | null>();

  const [userChosenExercises, setUserChosenExercises] = useState<
    exerciseBlueprintsInterface[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [notification, setNotification] = useState("");
  const [openNotification, setNotificationOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  const handleChooseExercises = (
    chosenExercises: exerciseBlueprintsInterface[]
  ) => {
    setUserChosenExercises(chosenExercises);
  };

  const fetchData = async (endpoint: string, userData: any) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        savePeriodizedTraining(data);

        console.log(`reponse`, data);
        setNotification("you created a periodized training structure ! ");
        setNotificationOpen(true);

        console.log(userChosenExercises);
      } else {
        const data: { statusCode: number; message: string } =
          await response.json();
        console.log(data);
        setError(data.message);
        setOpenError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatePeriodizedTrainingPlan = () => {
    const payload = userChosenExercises;
    fetchData(
      `http://localhost:3000/training-plans/periodized-training`,
      payload
    );
  };

  useEffect(() => {
    console.log(userChosenExercises);
  }, [userChosenExercises]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        {openError && (
          <ErrorHandlerDisplayComponent
            open={openError}
            handleClose={handleCloseError}
            error={error}
          />
        )}
        {openNotification && (
          <NotificationHandlerDisplayComponent
            open={openNotification}
            handleClose={handleCloseNotification}
            notification={notification}
          />
        )}
        <Button
          onClick={handleOpenModal}
          sx={{ ...ButtonStylingForApp, margin: "0px 10px" }}
        >
          Create template
        </Button>
        <Button
          onClick={handleCreatePeriodizedTrainingPlan}
          sx={{ ...ButtonStylingForApp, margin: "0px 10px" }}
        >
          Periodize template
        </Button>
      </Box>
      <ModalForCreatingPeriodizedData
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onChooseExercises={handleChooseExercises}
      />

      {periodizedTraining && (
        <Box sx={{ padding: "10px" }}>
          <Typography variant="h6" mb={4}>
            Training Plans
          </Typography>
          <Grid container spacing={4}>
            {periodizedTraining.trainingPlans.map(
              (trainingPlan: trainingPlanInterface, index: number) => (
                <Grid item xs={12} key={index}>
                  <TablesTemplateComponent
                    dayLabel={`Day ${index + 1}`}
                    mainExercises={trainingPlan.mainExercises}
                    accessoryExercises={trainingPlan.accessoryExercises}
                  />
                </Grid>
              )
            )}
          </Grid>
        </Box>
      )}
    </>
  );
};
