import {
  ChosenExercises,
  ExerciseHandlersInterface,
} from '../../../../../interfaces/Exercise.interface';
import { ExerciseBlueprintsInterface } from '../../../../../interfaces/Exercise.interface';
import { v4 as uuidv4 } from 'uuid';

export const assignExercises = (
  chosenExercises: ChosenExercises,
  movementPatterns: string[],
  exerciseHandlers: ExerciseHandlersInterface,
  biomotorAbilitiesUserWantsToTarget: string[],
  toolsUserHaveForDisposal: string[],
  numberOfMainExercisesPerUnit: number,
  numberOfAccesoryExercisesPerUnit: number
): ChosenExercises => {
  const { trainingPlans } = chosenExercises;
  if (!trainingPlans) {
    console.error('Training plans are undefined!');
    return chosenExercises;
  }

  const { exercises } = exerciseHandlers;
  const createExerciseFromPattern = (
    pattern: string,
    availableTools: string[]
  ): ExerciseBlueprintsInterface | null => {
    const matchingExercise = exercises.find(exercise => {
      console.log(
        `Checking exercise for pattern "${pattern}" with required tools:`,
        exercise.toolsUsedInExercise
      );

      if (exercise.movementPattern !== pattern) {
        return false;
      }

      // Ensure toolsUsedInExercise is always treated as an array, defaulting to an empty array if not set
      const requiredTools = Array.isArray(exercise.toolsUsedInExercise)
        ? exercise.toolsUsedInExercise
        : [];

      if (requiredTools.length === 0) {
        // If no specific tools are required, the exercise is considered universal
        return true;
      }

      // Check if all required tools of the exercise are included in the available tools
      return requiredTools.every(tool => availableTools.includes(tool));
    });

    if (matchingExercise) {
      console.log(`Selected matching exercise: ${matchingExercise.name}`);
      return {
        ...matchingExercise,
        _id: uuidv4(), // Generate a unique ID
      };
    }
    return null;
  };

  const updatedTrainingPlans = trainingPlans.map(trainingPlan => {
    const { mainExercises, accessoryExercises } = trainingPlan;

    const newMainExercises = [];
    const newAccessoryExercises = [];

    // Process each movement pattern to assign appropriate exercises
    movementPatterns.forEach(pattern => {
      if (
        newMainExercises.length < numberOfMainExercisesPerUnit &&
        !mainExercises.some(exercise => exercise.movementPattern === pattern)
      ) {
        const newMainExercise = createExerciseFromPattern(
          pattern,
          toolsUserHaveForDisposal
        );
        if (newMainExercise) {
          newMainExercises.push(newMainExercise);
        }
      }

      if (
        newAccessoryExercises.length < numberOfAccesoryExercisesPerUnit &&
        !accessoryExercises.some(
          exercise => exercise.movementPattern === pattern
        )
      ) {
        const newAccessoryExercise = createExerciseFromPattern(
          pattern,
          toolsUserHaveForDisposal
        );
        if (newAccessoryExercise) {
          newAccessoryExercises.push(newAccessoryExercise);
        }
      }
    });

    // Ensure that the number of exercises does not exceed the planned amount
    if (newMainExercises.length < numberOfMainExercisesPerUnit) {
      newMainExercises.push(
        ...mainExercises.slice(
          0,
          numberOfMainExercisesPerUnit - newMainExercises.length
        )
      );
    }
    if (newAccessoryExercises.length < numberOfAccesoryExercisesPerUnit) {
      newAccessoryExercises.push(
        ...accessoryExercises.slice(
          0,
          numberOfAccesoryExercisesPerUnit - newAccessoryExercises.length
        )
      );
    }

    return {
      ...trainingPlan,
      mainExercises: newMainExercises.slice(0, numberOfMainExercisesPerUnit),
      accessoryExercises: newAccessoryExercises.slice(
        0,
        numberOfAccesoryExercisesPerUnit
      ),
    };
  });

  return {
    ...chosenExercises,
    trainingPlans: updatedTrainingPlans,
  };
};
