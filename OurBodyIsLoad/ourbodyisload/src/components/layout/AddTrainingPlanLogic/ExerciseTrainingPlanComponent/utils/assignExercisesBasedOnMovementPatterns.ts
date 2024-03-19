import { ChosenExercises } from "../../../../../interfaces/Exercise.interface";
import { ExerciseBlueprintsInterface } from "../../../../../interfaces/Exercise.interface";

export const mandatoryMainPatterns = [
  "Squat",
  "Lunge",
  "Hinge",
  "Vertical Push",
  "Horizontal Push",
  "Vertical Pull",
  "Horizontal Pull",
];

export const movementPatterns = [
  ...mandatoryMainPatterns,
  "Rotational",
  "GAIT",
  "Minor Muscles Accessories",
];

export const assignExercises = (
  chosenExercises: ChosenExercises,
  movementPatterns: string[],
  exercises: ExerciseBlueprintsInterface[]
): ChosenExercises => {
  console.log("chosenExercises:", chosenExercises);
  console.log("movementPatterns:", movementPatterns);
  console.log("exercises:", exercises);

  const { trainingPlans } = chosenExercises;
  if (!trainingPlans) {
    console.error("Training plans are undefined!");
    return chosenExercises;
  }
  const trainingDay = trainingPlans.map((trainingPlan) => {
    return trainingPlan.day;
  });
  const trainingPlanMainExercises = trainingPlans.map((trainingPlan) => {
    return trainingPlan.mainExercises;
  });
  const trainingPlanAccesoryExercises = trainingPlans.map((trainingPlan) => {
    return trainingPlan.accessoryExercises;
  });

  const movementPatternsOfMainExercises = trainingPlanMainExercises.map(
    (movementPatterns) => {
      return movementPatterns;
    }
  );

  const dayIndex = trainingDay;

  console.log(
    `Training plans:`,
    trainingPlans.map((trainingPlan) => {
      const mainPatterns = trainingPlan.mainExercises.map(
        (exercise) => exercise.movementPattern
      );
      const accessoryPatterns = trainingPlan.accessoryExercises.map(
        (exercise) => exercise.movementPattern
      );
      return {
        day: trainingPlan.day,
        mainExercises: mainPatterns,
        accessoryExercises: accessoryPatterns,
      };
    })
  );

  // trainingPlans.forEach((trainingPlan) => {
  //   return (
  //     console.log(trainingPlan.day),
  //     console.log(
  //       trainingPlan.mainExercises.map((exercises) => {
  //         return exercises.movementPattern;
  //       })
  //     ),
  //     console.log(
  //       trainingPlan.accessoryExercises.map((exercises) => {
  //         return exercises.movementPattern;
  //       })
  //     )
  //   );
  // });

  return chosenExercises;
};
