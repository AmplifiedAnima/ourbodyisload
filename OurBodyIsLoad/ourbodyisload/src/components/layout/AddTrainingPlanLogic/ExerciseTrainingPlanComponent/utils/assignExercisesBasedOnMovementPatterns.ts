import {
  ChosenExercises,
  ExerciseHandlersInterface,
} from '../../../../../interfaces/Exercise.interface';
import { ExerciseBlueprintsInterface } from '../../../../../interfaces/Exercise.interface';
import { v4 as uuidv4 } from 'uuid';

export const mandatoryMainPatterns = [
  'Squat',
  'Lunge',
  'Hinge',
  'Vertical Push',
  'Horizontal Push',
  'Vertical Pull',
  'Horizontal Pull',
  'Rotational',
];

export const movementPatterns = [
  ...mandatoryMainPatterns,
  'GAIT',
  'Minor Muscles Accessories(calves)',
];

export const assignExercises = (
  chosenExercises: ChosenExercises,
  movementPatterns: string[],
  exerciseHandlers: ExerciseHandlersInterface,
  biomotorAbilitiesUserWantsToTarget: string[],
  toolsUserHaveForDisposal: string[]
): ChosenExercises => {
  const { trainingPlans } = chosenExercises;
  if (!trainingPlans) {
    console.error('Training plans are undefined!');
    return chosenExercises;
  }
  console.log(biomotorAbilitiesUserWantsToTarget);
  console.log(toolsUserHaveForDisposal);
  // Get existing exercises from the exerciseHandlers
  const { exercises } = exerciseHandlers;

  // Function to create a new exercise based on a movement pattern
  const createExerciseFromPattern = (
    pattern: string
  ): ExerciseBlueprintsInterface | null => {
    // Find an existing exercise with the matching movement pattern
    const matchingExercise = exercises.find(
      exercise => exercise.movementPattern === pattern
    );
    if (matchingExercise) {
      // Clone the existing exercise and generate a unique ID
      return {
        ...matchingExercise,
        _id: uuidv4(), // Generate a unique ID here
      };
    } else {
      // If no matching exercise found, return null
      return null;
    }
  };

  // Iterate over each training plan
  const updatedTrainingPlans = trainingPlans.map(trainingPlan => {
    const { mainExercises, accessoryExercises } = trainingPlan;

    // Filter main exercises that do not match any movement pattern
    const newMainExercises = mainExercises.filter(
      exercise => !movementPatterns.includes(exercise.movementPattern)
    );

    // Filter accessory exercises that do not match any movement pattern
    const newAccessoryExercises = accessoryExercises.filter(
      exercise => !movementPatterns.includes(exercise.movementPattern)
    );

    // Assign new exercises based on movement patterns
    movementPatterns.forEach(pattern => {
      // Add new main exercises
      if (
        !mainExercises.some(exercise => exercise.movementPattern === pattern)
      ) {
        const newMainExercise = createExerciseFromPattern(pattern);
        if (newMainExercise) {
          newMainExercises.push(newMainExercise);
        }
      }

      // Add new accessory exercises
      if (
        !accessoryExercises.some(
          exercise => exercise.movementPattern === pattern
        )
      ) {
        const newAccessoryExercise = createExerciseFromPattern(pattern);
        if (newAccessoryExercise) {
          newAccessoryExercises.push(newAccessoryExercise);
        }
      }
    });

    return {
      ...trainingPlan,
      mainExercises: newMainExercises,
      accessoryExercises: newAccessoryExercises,
    };
  });

  // Return the chosen exercises with updated training plans
  return {
    ...chosenExercises,
    trainingPlans: updatedTrainingPlans,
  };
};
