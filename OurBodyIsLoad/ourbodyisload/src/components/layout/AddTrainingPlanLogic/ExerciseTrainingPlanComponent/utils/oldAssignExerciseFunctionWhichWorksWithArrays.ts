import { TrainingPlanInterface } from "../../../../../interfaces/TrainingPlan.interface";

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
  "squat",
  "lunge",
  "hinge",
  "verticalPush",
  "horizontalPush",
  "verticalPull",
  "horizontalPull",
  "rotational",
  "GAIT",
  "minorMusclesAccessories",
];

export const assignExercises = (
  trainingPlan: { [key: string]: TrainingPlanInterface },
  movementPatterns: string[]
) => {
  // Define the mandatory main patterns for at least one day

  // Step 1: Assign mandatory movement patterns to main exercises
  const days = Object.keys(trainingPlan);
  mandatoryMainPatterns.forEach((pattern, index) => {
    const dayKey = days[index % days.length]; // Cycle through days for each pattern
    const dayPlan = trainingPlan[dayKey];
    let mainExerciseAssigned = false;
    // Check if the day already has the pattern, if not, assign it to the first available main exercise
    for (const exercise of dayPlan.mainExercises) {
      if (exercise.movementPattern === "") {
        exercise.movementPattern = pattern;
        mainExerciseAssigned = true;
        break;
      }
    }
    // If none of the main exercises was available, we can assign the pattern to the first main exercise by force
    if (!mainExerciseAssigned) {
      dayPlan.mainExercises[0].movementPattern = pattern;
    }
  });

  // Step 2: Gather remaining unused patterns
  let remainingPatterns = movementPatterns.filter((pattern) => {
    return !mandatoryMainPatterns.includes(pattern);
  });

  // Step 3: Assign remaining patterns to accessory exercises
  Object.values(trainingPlan).forEach((dayPlan) => {
    // Track assigned patterns to avoid repetition in the same day
    let dayAssignedPatterns = new Set(
      dayPlan.mainExercises.map((ex) => ex.movementPattern)
    );

    dayPlan.accessoryExercises.forEach((exercise) => {
      if (!exercise.movementPattern) {
        // Get the first unused pattern for the accessory exercise
        let patternToAssign: any;
        while (remainingPatterns.length > 0) {
          patternToAssign = remainingPatterns.shift();
          if (!dayAssignedPatterns.has(patternToAssign)) {
            break;
          }
        }

        // If we've run out of unique patterns, cycle through the list again
        if (!patternToAssign) {
          patternToAssign = movementPatterns.find(
            (p) => !dayAssignedPatterns.has(p)
          );
          remainingPatterns = movementPatterns.filter(
            (p) => p !== patternToAssign
          );
        }

        exercise.movementPattern = patternToAssign;
        dayAssignedPatterns.add(patternToAssign);
      }
    });
  });

  // Return the modified training plan with the patterns assigned
  return trainingPlan;
};