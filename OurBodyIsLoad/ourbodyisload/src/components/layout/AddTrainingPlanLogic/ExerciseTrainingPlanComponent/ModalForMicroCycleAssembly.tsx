import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';
import { ButtonStylingForApp } from '../../../../globalStyles/ButtonStylingForApp';
import {
  assignExercises,
  movementPatterns,
} from './utils/assignExercisesBasedOnMovementPatterns';
import {
  ChosenExercises,
  ExerciseHandlersInterface,
} from '../../../../interfaces/Exercise.interface';
import { TrainingDays } from '../../../../interfaces/TrainingPlan.interface';
import { useState } from 'react';

interface ModalForMicroCycleAssemblyProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseHandlers: ExerciseHandlersInterface;
}
const biomotorAbilitiesToChoose = [
  'Strength',
  'Power - plyometry',
  'Power - light Balistics',
  'Power - medium Balistics',
  'Power - heavy Balistics',
  'Power endurance',
  'Speed',
  'Speed Strength',
  'Speed Endurance',
  'Hypertrophy',
  'Mobility',
];
const toolsForTrainingUsage = [
  'barbell',
  'landmine',
  'safety bar',
  'trap bar',
  'dumbells',
  'dumbell',
  'ketlebells',
  'kettlebell',
  'gymnastic rings',
  'pull-up bar',
  'dips bars',
  'parelettes',
  'medicine ball',
  'swiss ball',
  'bicycle',
  'bodyweight',
];

export const ModalForMicroCycleAssembly: React.FC<
  ModalForMicroCycleAssemblyProps
> = ({ isOpen, onClose, exerciseHandlers }) => {
  const [primaryAbility, setPrimaryAbility] = useState('');
  const [secondaryAbility, setSecondaryAbility] = useState('');

  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const handleToolChange = (event: any) => {
    const tool = event.target.name;
    setSelectedTools(prevSelectedTools =>
      prevSelectedTools.includes(tool)
        ? prevSelectedTools.filter(t => t !== tool)
        : [...prevSelectedTools, tool]
    );
  };

  const handlePrimaryChange = (event: any) => {
    setPrimaryAbility(event.target.value as string);
  };

  const handleSecondaryChange = (event: any) => {
    setSecondaryAbility(event.target.value as string);
  };

  const handleAssembleClick = () => {
    const chosenExercises: ChosenExercises = {
      timesAWeek: exerciseHandlers.daysAWeek,
      trainingPlans: Object.keys(exerciseHandlers.trainingDays).map(day => ({
        day,
        mainExercises: exerciseHandlers.trainingDays[day].main,
        accessoryExercises: exerciseHandlers.trainingDays[day].accessory,
      })),
      periodization: exerciseHandlers.periodization,
    };

    const updatedChosenExercises = assignExercises(
      chosenExercises,
      movementPatterns,
      exerciseHandlers,
      exerciseHandlers.biomotorAbilitiesUserWantsToTarget,
      exerciseHandlers.toolsAvailableToUserForTraining
    );

    const updatedTrainingDays: TrainingDays = {};
    updatedChosenExercises.trainingPlans.forEach(plan => {
      const { day, mainExercises, accessoryExercises } = plan;
      updatedTrainingDays[day] = {
        main: mainExercises,
        accessory: accessoryExercises,
      };
    });
    exerciseHandlers.setBiomotorAbilitiesUserWantsToTarget([
      primaryAbility,
      secondaryAbility,
    ]);

    exerciseHandlers.setToolsAvailableToUserForTraining([
      'barbell',
      'med-ball',
      'bodyweight',
    ]);

    exerciseHandlers.setTrainingDays(updatedTrainingDays);
    console.log(exerciseHandlers.biomotorAbilitiesUserWantsToTarget);
    console.log(updatedTrainingDays);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto', // Adjusted to 'auto' for padding to define the size
          bgcolor: 'background.paper',
          p: 4, // Increased padding for better spacing
          borderRadius: 2,
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Added for better alignment
          gap: 2, // Adds space between child elements
        }}
      >
        <Typography variant="body1" gutterBottom mb={0.5}>
          choose primary bio-motor ability
        </Typography>
        <Select
          value={primaryAbility}
          onChange={handlePrimaryChange}
          displayEmpty
        >
          {biomotorAbilitiesToChoose.map(ability => (
            <MenuItem key={ability} value={ability}>
              {ability}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="body1" gutterBottom mb={0.5}>
          choose secondary bio-motor ability
        </Typography>
        <Select
          value={secondaryAbility}
          onChange={handleSecondaryChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {biomotorAbilitiesToChoose
            .filter(ability => ability !== primaryAbility) // Filter out the selected primary ability
            .map(ability => (
              <MenuItem key={ability} value={ability}>
                {ability}
              </MenuItem>
            ))}
        </Select>

        <Typography variant="body1" gutterBottom mb={0.5}>
          choose tools available to use
        </Typography>
        <FormGroup
          sx={{
            height: '200px',
            overflowY: 'auto',
          }}
        >
          {toolsForTrainingUsage.map(tool => (
            <FormControlLabel
              key={tool}
              control={
                <Checkbox
                  checked={selectedTools.includes(tool)}
                  onChange={handleToolChange}
                  name={tool}
                />
              }
              label={tool}
            />
          ))}
        </FormGroup>

        <Button
          sx={{ ...ButtonStylingForApp, width: 'auto' }}
          onClick={handleAssembleClick}
        >
          Assemble based on Movement pattern
        </Button>
      </Box>
    </Modal>
  );
};
