import { Box, Button, Grid, Typography } from "@mui/material";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { useEffect, useState } from "react";
import { CycleInterface } from "../../../interfaces/Cycle.interface";
import { TablesTemplateComponent } from "./TablesTemplateComponent";
import ErrorHandlerDisplayComponent from "../ErrorAndNotificationHandlers/ErrorHandlerDisplayComponent";
import { NotificationHandlerDisplayComponent } from "../ErrorAndNotificationHandlers/NotificationHandlerDisplayComponent";
import { TrainingPlanInterface } from "../../../interfaces/TrainingPlan.interface";
import { ModalForCreatingPeriodizedTemplate } from "./ExerciseTrainingPlanComponent/ModalForCreatingPeriodizedTemplate";
import { ChosenExercises } from "../../../interfaces/Exercise.interface";
import useExerciseHandlers from "./ExerciseTrainingPlanComponent/utils/useExerciseHandlers";

export const AddTrainingPlanLogic = () => {
  const [periodizedTraining, savePeriodizedTraining] =
    useState<CycleInterface | null>();

  const [userChosenExercises, setUserChosenExercises] =
    useState<ChosenExercises>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [notification, setNotification] = useState("");
  const [openNotification, setNotificationOpen] = useState(false);

  const exerciseHandlers = useExerciseHandlers()
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

  const handleChooseExercises = (chosenExercises: ChosenExercises) => {
    setUserChosenExercises(chosenExercises);
  };

  const fetchData = async (endpoint: string, userData: ChosenExercises) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log(userData);
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
    let payload = userChosenExercises;
    if (typeof payload === "undefined") {
      payload = { timesAWeek: "0", trainingPlans: [], periodization: "" };
    } else {
      fetchData(
        `http://localhost:3000/training-plans/periodized-training`,
        payload
      );
    }
  };
  //deal with the CRUD later
  const fakeIdDelete = "iitwiuetiwheith";
  const fakeIdUpdate = "iitwiuetiwheith";
  const handleDelete = (id: string) => {
    console.log(id);
  };
  const handleUpdate = (id: string) => {
    console.log(id);
  };
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
      <ModalForCreatingPeriodizedTemplate
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
              (trainingPlan: TrainingPlanInterface, index: number) => (
             
                <Grid item xs={12} key={index}>
                  <TablesTemplateComponent
                    dayLabel={`Day ${index + 1}`}
                    mainExercises={trainingPlan.mainExercises}
                    accessoryExercises={trainingPlan.accessoryExercises}
                    onDelete={exerciseHandlers.handleDeleteExercise}
                    onUpdate={exerciseHandlers.handleUpdateExercise}
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
