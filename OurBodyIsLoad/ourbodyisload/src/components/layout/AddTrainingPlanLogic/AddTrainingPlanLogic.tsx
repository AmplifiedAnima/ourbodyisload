import { Box, Button, Grid, Typography } from "@mui/material";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { useEffect, useState } from "react";
import { trainingPlanInterface } from "../../../interfaces/trainingPlan.interface";
import { exerciseBlueprintsInterface } from "../../../interfaces/exercise.interface";
import { cycleOfTrainingPlansInterface } from "../../../interfaces/cycleOfTrainingPlans.interface";
import { searchFunctionalityInterface } from "../../../interfaces/search.interface";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchExercises } from "../../../store/slices/searchSlice";
import { AppDispatch } from "../../../store/store";
import { ModalWithExercisesChoice } from "./ModalWithExercisesChoice";
import { v4 as uuidv4 } from "uuid";
import { TablesTemplateComponent } from "./TablesTemplateComponent";

export const AddTrainingPlanLogic = () => {
  const [periodizedTraining, savePeriodizedTraining] =
    useState<cycleOfTrainingPlansInterface | null>();
  const exercises = useSelector(
    (state: { search: searchFunctionalityInterface }) => state.search.exercises
  );

  const [userChosenExercises, setUserChosenExercises] = useState<
    exerciseBlueprintsInterface[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchExercises(""));
  }, [dispatch]);

  const mockDataPeriodized = {
    trainingPlans: [] as trainingPlanInterface[],
    timesAWeek: "2",
  };

  exercises.forEach((exercise) => {
    const exerciseId = uuidv4(); // Generate unique ID for the exercise
    const trainingPlan: trainingPlanInterface = {
      _id: uuidv4(), // Generate unique ID for the training plan
      mainExercises: [
        {
          _id: exerciseId, // Assign the generated ID to the exercise
          name: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          intensity: exercise.intensity,
          movementPattern: exercise.movementPattern,
          plane: exercise.plane,
          type: exercise.type,
        },
      ],
      accessoryExercises: [
        {
          _id: exerciseId, // Assign the same ID to accessory exercise
          name: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          intensity: exercise.intensity,
          movementPattern: exercise.movementPattern,
          plane: exercise.plane,
          type: exercise.type,
        },
      ],
    };
    mockDataPeriodized.trainingPlans.push(trainingPlan);
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChooseExercises = (
    chosenExercises: exerciseBlueprintsInterface[]
  ) => {
    setUserChosenExercises(chosenExercises);
  };
  // Assuming exercises contain the list of exercise blueprints

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
        console.log(userChosenExercises);
      } else {
        console.log("Error fetching");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleCreateTrainingPlan = () => {
  //     // Assuming this is for non-periodized plans
  //     fetchData(`http://localhost:3000/training-plans`, mockData);
  //   };
  const handleCreatePeriodizedTrainingPlan = () => {
    // Assuming 'formattedExercises' is the data in the same structure as your 'mockTrainingPlansData'
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
        {/* Button to open modal */}
        <Button
          onClick={handleOpenModal}
          sx={{ ...ButtonStylingForApp, margin: "0px 10px" }}
        >
          Add Exercises
        </Button>
        <Button
          onClick={handleCreatePeriodizedTrainingPlan}
          sx={{ ...ButtonStylingForApp, margin: "0px 10px" }}
        >
          Handle Periodized Creation
        </Button>
      </Box>
      <ModalWithExercisesChoice
        exercises={exercises}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onChooseExercises={handleChooseExercises}
      />

      {periodizedTraining && (
        <Box sx={{ padding: "10px" }}>
          <Typography variant="h6" mb={4}>Training Plans</Typography>
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
