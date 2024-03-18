import { ChosenExercises } from "../../../../../interfaces/Exercise.interface";
import { ExerciseBlueprintsInterface } from "../../../../../interfaces/Exercise.interface";

export const mandatoryMainPatterns = [
  "squat",
  "lunge",
  "hinge",
  "verticalPush",
  "horizontalPush",
  "verticalPull",
  "horizontalPull",
];

export const movementPatterns = [
  ...mandatoryMainPatterns,
  "rotational",
  "GAIT",
  "minorMusclesAccessories",
];

export const assignExercises = (
  chosenExercises: ChosenExercises,
  movementPatterns: string[],
  exercises: ExerciseBlueprintsInterface[]
) => {
  console.log("chosenExercises:", chosenExercises);
  console.log("movementPatterns:", movementPatterns);
  console.log("exercises:", exercises);

  const { trainingPlans } = chosenExercises;
  console.log("trainingPlans:", trainingPlans);

  if (!trainingPlans) {
    console.error("Training plans are undefined!");
    return chosenExercises;
  }

  // Create a copy of the exercises array
  let assignedExercises: ExerciseBlueprintsInterface[] = [...exercises];

  // Assign exercises to training plans based on movement patterns
  trainingPlans.forEach((plan, index) => {
    console.log(`Plan ${index + 1}:`, plan);
    const { day, mainExercises, accessoryExercises } = plan;

    if (!day || !mainExercises || !accessoryExercises) {
      console.error("Incomplete plan detected:", plan);
      return;
    }

    // Assign movement patterns to main exercises
    mainExercises.forEach((exercise, index) => {
      console.log(`Main exercise ${index + 1} for day ${day}:`, exercise);
      const matchingExercise = assignedExercises.find(
        (ex) => ex._id === exercise._id
      );
      if (!matchingExercise) {
        console.error(
          `Exercise not found for main exercise ${index + 1} for day ${day}:`,
          exercise
        );
        return;
      }
      const patternToAssign = movementPatterns.shift();
      if (patternToAssign) {
        console.log(
          `Assigning pattern '${patternToAssign}' to main exercise ${
            index + 1
          } for day ${day}`
        );
        matchingExercise.movementPattern = patternToAssign;
      }
    });

    // Assign movement patterns to accessory exercises
    accessoryExercises.forEach((exercise, index) => {
      console.log(`Accessory exercise ${index + 1} for day ${day}:`, exercise);
      const matchingExercise = assignedExercises.find(
        (ex) => ex._id === exercise._id
      );
      if (!matchingExercise) {
        console.error(
          `Exercise not found for accessory exercise ${
            index + 1
          } for day ${day}:`,
          exercise
        );
        return;
      }
      const patternToAssign = movementPatterns.shift();
      if (patternToAssign) {
        console.log(
          `Assigning pattern '${patternToAssign}' to accessory exercise ${
            index + 1
          } for day ${day}`
        );
        matchingExercise.movementPattern = patternToAssign;
      }
    });
  });

  // Assign remaining exercises to unassigned training days based on movement patterns
  let remainingExercises = assignedExercises.filter(
    (exercise) => !exercise.movementPattern
  );
  let remainingIndex = 0;
  trainingPlans.forEach((plan) => {
    if (!plan.mainExercises || !plan.accessoryExercises) {
      const remainingMainExercises = remainingExercises.splice(0, 1);
      plan.mainExercises = remainingMainExercises;
      remainingIndex++;
    }
    if (!plan.accessoryExercises) {
      const remainingAccessoryExercises = remainingExercises.splice(0, 1);
      plan.accessoryExercises = remainingAccessoryExercises;
      remainingIndex++;
    }
    if (remainingIndex >= remainingExercises.length) return;
  });

  console.log("Updated assignedExercises:", assignedExercises);

  return chosenExercises;
};
