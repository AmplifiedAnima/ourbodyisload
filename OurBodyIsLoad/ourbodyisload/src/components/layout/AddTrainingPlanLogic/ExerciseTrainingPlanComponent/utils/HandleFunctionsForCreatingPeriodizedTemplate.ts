import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { ExerciseBlueprintsInterface } from "../../../../../interfaces/Exercise.interface";
import { ChosenExercises } from "../../../../../interfaces/Exercise.interface";
import { TrainingDays } from "../../../../../interfaces/TrainingPlan.interface";
import { v4 as uuidv4 } from "uuid";
const exerciseHandlers = {
  handleDaySelectionChange:
    (setSelectedDay: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<{ value: unknown }>) => {
      setSelectedDay(event.target.value as string);
    },

  handleAddExercise:
    (
      setSelectedExercise: Dispatch<
        SetStateAction<ExerciseBlueprintsInterface | null>
      >,
      setExerciseTypeModalOpen: Dispatch<SetStateAction<boolean>>
    ) =>
    (exercise: ExerciseBlueprintsInterface) => {
      setSelectedExercise(exercise);
      setExerciseTypeModalOpen(true);
    },

  handleChooseExercises:
    (
      daysAWeek: string,
      trainingDays: TrainingDays,
      periodization: string,
      onChooseExercises: (chosenExercises: ChosenExercises) => void,
      onClose: () => void
    ) =>
    () => {
      const chosenExercisesData = {
        timesAWeek: daysAWeek,
        trainingPlans: Object.keys(trainingDays).map((day) => ({
          day,
          mainExercises: trainingDays[day].main,
          accessoryExercises: trainingDays[day].accessory,
        })),
        periodization,
      };
      console.log(chosenExercisesData);
      onChooseExercises(chosenExercisesData);
      onClose();
    },

  handleCloseExerciseTypeModal:
    (
      setSelectedExercise: Dispatch<
        SetStateAction<ExerciseBlueprintsInterface | null>
      >,
      setExerciseTypeModalOpen: Dispatch<SetStateAction<boolean>>
    ) =>
    () => {
      setSelectedExercise(null);
      setExerciseTypeModalOpen(false);
    },

  handleSetExerciseType:
    (
      selectedDay: string,
      setSelectedExercise: Dispatch<
        SetStateAction<ExerciseBlueprintsInterface | null>
      >,
      setTrainingDays: Dispatch<SetStateAction<TrainingDays>>,
      setExerciseTypeModalOpen: Dispatch<SetStateAction<boolean>>,
      selectedExercise: ExerciseBlueprintsInterface | null,
      sets: string,
      reps: string,
      intensity: string
    ) =>
    (type: "main" | "accessory") => {
      if (!selectedDay || !selectedExercise) return;
      const newExercise = {
        ...selectedExercise,
        _id: uuidv4(),
        sets,
        reps,
        intensity,
      };
      setTrainingDays((prev) => ({
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay],
          [type]: [...prev[selectedDay][type], newExercise],
        },
      }));
      setSelectedExercise(null);
      setExerciseTypeModalOpen(false);
    },

  handleSetsChange:
    (setSets: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setSets(event.target.value);
    },

  handleRepsChange:
    (setReps: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setReps(event.target.value);
    },

  handleIntensityChange:
    (setIntensity: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setIntensity(event.target.value);
    },

  handlePeriodizationChange:
    (setPeriodization: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<{ value: unknown }>) => {
      setPeriodization(event.target.value as string);
    },

  handleInputValue:
    (setSearchingQuery: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setSearchingQuery(event.target.value);
    },
};

export default exerciseHandlers;
