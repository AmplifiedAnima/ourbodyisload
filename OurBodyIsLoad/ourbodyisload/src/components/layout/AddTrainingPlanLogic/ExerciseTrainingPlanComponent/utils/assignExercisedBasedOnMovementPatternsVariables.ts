export const prilepinsTable = [
  {
    percentageOf1RM: '55-65%',
    optimalTotalReps: 24,
    rangeOfTotalReps: '18-30',
    optimalRepsPerSet: '3-6',
    sets: '4-6',
  },
  {
    percentageOf1RM: '70-75%',
    optimalTotalReps: 18,
    rangeOfTotalReps: '12-24',
    optimalRepsPerSet: '3-6',
    sets: '3-6',
  },
  {
    percentageOf1RM: '80-85%',
    optimalTotalReps: 15,
    rangeOfTotalReps: '10-20',
    optimalRepsPerSet: '2-4',
    sets: '4-6',
  },
  {
    percentageOf1RM: '90%+',
    optimalTotalReps: 7,
    rangeOfTotalReps: '4-10',
    optimalRepsPerSet: '1-2',
    sets: '3-6',
  },
];
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
export const trainingModalities = [
  'GAIT',
  'Minor Muscles Accessories(calves)',
  'Minor Muscles Accessories(rotator-cuff)',
  'Minor Muscles Accessories(leg-adduction)',
  'Minor Muscles Accessories(leg-abduction)',
  'Minor Muscles Accessories(traps)',
];
export const movementPatterns = [
  ...mandatoryMainPatterns,
  ...trainingModalities,
];
