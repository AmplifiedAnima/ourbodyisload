import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { TrainingDays } from './TrainingPlan.interface';

export interface ExerciseBlueprintsInterface {
  _id: string;
  name?: string;
  sets: string;
  reps: string;
  intensity: string;
  movementPattern: string;
  plane: string;
  type: string;
}

export interface ChosenExercises {
  timesAWeek: string;
  trainingPlans: Array<{
    day: string;
    mainExercises: ExerciseBlueprintsInterface[];
    accessoryExercises: ExerciseBlueprintsInterface[];
  }>;
  periodization: string;
}

export interface ExerciseHandlersInterface {
  exercises: ExerciseBlueprintsInterface[];
  selectedDay: string;
  selectedExercise: ExerciseBlueprintsInterface | null;
  sets: string;
  reps: string;
  intensity: string;
  exerciseTempo: string;
  periodization: string;
  searchingQuery: string;
  daysAWeek: string;
  trainingDays: TrainingDays;
  exerciseTypeModalOpen: boolean;
  isExerciseListVisible: boolean;
  durationInWeeksOfTrainingPlan: string;
  toolsAvailableToUserForTraining: string[];
  biomotorAbilitiesUserWantsToTarget: string[];
  handleDaySelectionChange: (event: SelectChangeEvent<string>) => void;
  handleAddExercise: (exercise: ExerciseBlueprintsInterface) => void;
  handleChooseExercises: (
    onChooseExercises: (chosenExercises: ChosenExercises) => void,
    onClose: () => void
  ) => void;
  handleCloseExerciseTypeModal: () => void;
  handleSetExerciseType: (type: 'main' | 'accessory') => void;
  handleSetsChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    exercise: ExerciseBlueprintsInterface
  ) => void;
  handleRepsChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    exercise: ExerciseBlueprintsInterface
  ) => void;
  handleIntensityChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePeriodizationChange: (event: SelectChangeEvent<string>) => void;
  handleInputValue: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDeleteExercise: (id: string) => void;
  handleUpdateExercise: (
    id: string,
    updatedExercise: ExerciseBlueprintsInterface
  ) => void;
  setSearchingQuery: Dispatch<SetStateAction<string>>;
  setSets: Dispatch<SetStateAction<string>>;
  setReps: Dispatch<SetStateAction<string>>;
  setIntensity: Dispatch<SetStateAction<string>>;
  setExerciseTempo: Dispatch<SetStateAction<string>>;
  setPeriodization: Dispatch<SetStateAction<string>>;
  setExerciseTypeModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedExercise: Dispatch<
    SetStateAction<ExerciseBlueprintsInterface | null>
  >;
  setSelectedDay: Dispatch<SetStateAction<string>>;
  setTrainingDays: Dispatch<SetStateAction<TrainingDays>>;
  setDaysAWeek: Dispatch<SetStateAction<string>>;
  setIsExerciseListVisible: Dispatch<SetStateAction<boolean>>;
  setDurationInWeeksOfTrainingPlan: Dispatch<SetStateAction<string>>;
  setToolsAvailableToUserForTraining: Dispatch<SetStateAction<string[]>>;
  setBiomotorAbilitiesUserWantsToTarget: Dispatch<SetStateAction<string[]>>;
}
