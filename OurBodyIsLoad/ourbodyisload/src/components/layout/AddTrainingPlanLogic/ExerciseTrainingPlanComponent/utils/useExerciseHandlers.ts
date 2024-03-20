import { useState, ChangeEvent, useEffect } from "react";
import {
  ExerciseBlueprintsInterface,
  ExerciseHandlersInterface,
} from "../../../../../interfaces/Exercise.interface";
import { ChosenExercises } from "../../../../../interfaces/Exercise.interface";
import { TrainingDays } from "../../../../../interfaces/TrainingPlan.interface";
import { v4 as uuidv4 } from "uuid";
import { SelectChangeEvent } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchExercises } from "../../../../../store/slices/searchSlice";
import { SearchFunctionalityInterface } from "../../../../../interfaces/Search.interface";
import { AppDispatch } from "../../../../../store/store";

const useExerciseHandlers: () => ExerciseHandlersInterface = () => {
  const [selectedDay, setSelectedDay] = useState<string>("day1");
  const [selectedExercise, setSelectedExercise] =
    useState<ExerciseBlueprintsInterface | null>(null);
  const [daysAWeek, setDaysAWeek] = useState<string>("2");
  const [isExerciseListVisible, setIsExerciseListVisible] = useState(false);
  const [trainingDays, setTrainingDays] = useState<TrainingDays>({});
  const [sets, setSets] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [intensity, setIntensity] = useState<string>("");
  const [periodization, setPeriodization] = useState<string>("strength");
  const [searchingQuery, setSearchingQuery] = useState<string>("");
  const [exerciseTypeModalOpen, setExerciseTypeModalOpen] =
    useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const exercises = useSelector(
    (state: { search: SearchFunctionalityInterface }) => state.search.exercises
  );
  const searchQuery = useSelector(
    (state: { search: SearchFunctionalityInterface }) =>
      state.search.searchQuery
  );

  useEffect(() => {
    dispatch(fetchExercises(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    const updatedTrainingDays: TrainingDays = {};
    for (let i = 1; i <= Math.min(parseInt(daysAWeek), 3); i++) {
      updatedTrainingDays[`day${i}`] = { main: [], accessory: [] };
    }
    setTrainingDays(updatedTrainingDays);
  }, [daysAWeek]);

  const handleDaySelectionChange = (event: SelectChangeEvent<string>) => {
    setSelectedDay(event.target.value);
  };
  const handleAddExercise = (exercise: ExerciseBlueprintsInterface) => {
    setSelectedExercise(exercise);
    setExerciseTypeModalOpen(true);
  };

  const handleChooseExercises = (
    onChooseExercises: (chosenExercises: ChosenExercises) => void,
    onClose: () => void
  ) => {
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
  };

  const handleCloseExerciseTypeModal = () => {
    setSelectedExercise(null);
    setExerciseTypeModalOpen(false);
  };

  const handleSetExerciseType = (type: "main" | "accessory") => {
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
  };

  const handleSetsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSets(event.target.value);
  };

  const handleRepsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReps(event.target.value);
  };

  const handleIntensityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIntensity(event.target.value);
  };

  const handlePeriodizationChange = (event: SelectChangeEvent<string>) => {
    setPeriodization(event.target.value as string);
  };

  const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchingQuery(event.target.value);
  };
  return {
    exercises,
    selectedDay,
    selectedExercise,
    sets,
    reps,
    intensity,
    periodization,
    searchingQuery,
    daysAWeek,
    trainingDays,
    exerciseTypeModalOpen,
    isExerciseListVisible,
    handleDaySelectionChange,
    handleAddExercise,
    handleChooseExercises,
    handleCloseExerciseTypeModal,
    handleSetExerciseType,
    handleSetsChange,
    handleRepsChange,
    handleIntensityChange,
    handlePeriodizationChange,
    handleInputValue,
    setSearchingQuery,
    setSets,
    setReps,
    setIntensity,
    setPeriodization,
    setExerciseTypeModalOpen,
    setSelectedExercise,
    setSelectedDay,
    setTrainingDays,
    setDaysAWeek,
    setIsExerciseListVisible,
  };
};

export default useExerciseHandlers;
