import { useState, ChangeEvent, useEffect } from 'react';
import {
  ExerciseBlueprintsInterface,
  ExerciseHandlersInterface,
} from '../../../../../interfaces/Exercise.interface';
import { ChosenExercises } from '../../../../../interfaces/Exercise.interface';
import { TrainingDays } from '../../../../../interfaces/TrainingPlan.interface';
import { v4 as uuidv4 } from 'uuid';
import { SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchExercises } from '../../../../../store/slices/searchSlice';
import { SearchFunctionalityInterface } from '../../../../../interfaces/Search.interface';
import { AppDispatch } from '../../../../../store/store';

const useExerciseHandlers: () => ExerciseHandlersInterface = () => {
  const [selectedDay, setSelectedDay] = useState<string>('day1');
  const [selectedExercise, setSelectedExercise] =
    useState<ExerciseBlueprintsInterface | null>(null);
  const [daysAWeek, setDaysAWeek] = useState<string>('2');
  const [isExerciseListVisible, setIsExerciseListVisible] = useState(false);
  const [trainingDays, setTrainingDays] = useState<TrainingDays>({});
  const [sets, setSets] = useState<string>('');
  const [reps, setReps] = useState<string>('');
  const [intensity, setIntensity] = useState<string>('');
  const [exerciseTempo, setExerciseTempo] = useState<string>('1-1-1');
  const [periodization, setPeriodization] = useState<string>('undulating');
  const [durationInWeeksOfTrainingPlan, setDurationInWeeksOfTrainingPlan] =
    useState('3');
  const [toolsAvailableToUserForTraining, setToolsAvailableToUserForTraining] =
    useState<string[]>([]);
  const [
    biomotorAbilitiesUserWantsToTarget,
    setBiomotorAbilitiesUserWantsToTarget,
  ] = useState<string[]>([]);
  const [searchingQuery, setSearchingQuery] = useState<string>('');
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
    // Only set default values if user hasn't already provided values
    setSets(currentSets => currentSets || exercise.sets || '');
    setReps(currentReps => currentReps || exercise.reps || '');
    setIntensity(
      currentIntensity => currentIntensity || exercise.intensity || ''
    );
    setExerciseTypeModalOpen(true);
  };

  const handleChooseExercises = (
    onChooseExercises: (chosenExercises: ChosenExercises) => void,
    onClose: () => void
  ) => {
    const chosenExercisesData = {
      timesAWeek: daysAWeek,
      trainingPlans: Object.keys(trainingDays).map(day => ({
        day,
        mainExercises: trainingDays[day].main,
        accessoryExercises: trainingDays[day].accessory,
      })),
      periodization,
      durationInWeeksOfTrainingPlan,
      biomotorAbilitiesUserWantsToTarget,
    };
    console.log(chosenExercisesData);
    onChooseExercises(chosenExercisesData);
    onClose();
  };

  const handleCloseExerciseTypeModal = () => {
    setSelectedExercise(null);
    setExerciseTypeModalOpen(false);
  };

  const handleSetExerciseType = (type: 'main' | 'accessory') => {
    if (!selectedDay || !selectedExercise) return;
    const newExercise = {
      ...selectedExercise,
      _id: uuidv4(),
      sets,
      reps,
      intensity,
    };
    setTrainingDays(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [type]: [...prev[selectedDay][type], newExercise],
      },
    }));
    setSelectedExercise(null);
    setExerciseTypeModalOpen(false);
  };

  const handleSetsChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    exercise: ExerciseBlueprintsInterface
  ) => {
    if (event.target.value !== '') {
      setSets(event.target.value);
    } else {
      setReps(exercise.sets);
    }
  };

  const handleRepsChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    exercise: ExerciseBlueprintsInterface
  ) => {
    if (event.target.value !== '') {
      setReps(event.target.value);
    } else {
      setReps(exercise.reps);
    }
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
  const handleDeleteExercise = (id: string) => {
    console.log(id);
    setTrainingDays(prevTrainingDays => {
      const updatedTrainingDays = { ...prevTrainingDays };

      // Iterate through each day
      Object.keys(updatedTrainingDays).forEach(day => {
        updatedTrainingDays[day].main = updatedTrainingDays[day].main.filter(
          exercise => exercise._id !== id
        );
        updatedTrainingDays[day].accessory = updatedTrainingDays[
          day
        ].accessory.filter(exercise => exercise._id !== id);
      });

      return updatedTrainingDays;
    });
  };

  const handleUpdateExercise = (
    id: string,
    updatedExercise: ExerciseBlueprintsInterface
  ) => {
    console.log(id, updatedExercise);
  };

  return {
    exercises,
    selectedDay,
    selectedExercise,
    sets,
    reps,
    intensity,
    exerciseTempo,
    periodization,
    searchingQuery,
    daysAWeek,
    trainingDays,
    exerciseTypeModalOpen,
    isExerciseListVisible,
    durationInWeeksOfTrainingPlan,
    toolsAvailableToUserForTraining,
    biomotorAbilitiesUserWantsToTarget,
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
    setExerciseTempo,
    setPeriodization,
    setExerciseTypeModalOpen,
    setSelectedExercise,
    setSelectedDay,
    setTrainingDays,
    setDaysAWeek,
    setIsExerciseListVisible,
    setDurationInWeeksOfTrainingPlan,
    setToolsAvailableToUserForTraining,
    setBiomotorAbilitiesUserWantsToTarget,
    handleDeleteExercise,
    handleUpdateExercise,
  };
};

export default useExerciseHandlers;
