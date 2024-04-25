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
import { ButtonStylingForApp } from '../../../../../globalStyles/ButtonStylingForApp';
import {
  assignExercises,
  mandatoryMainPatterns,
  movementPatterns,
} from '../utils/assignExercisesBasedOnMovementPatterns';
import {
  ChosenExercises,
  ExerciseHandlersInterface,
} from '../../../../../interfaces/Exercise.interface';
import { TrainingDays } from '../../../../../interfaces/TrainingPlan.interface';
import { ChangeEvent, useState } from 'react';
import {
  biomotorAbilitiesToChoose,
  toolsForTrainingUsage,
} from '../utils/modalForCreatingPeriodizedTemplateUtils';
import { CustomSelect } from './CustomSelectComponent';
interface ModalForMicroCycleAssemblyProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseHandlers: ExerciseHandlersInterface;
  handleSearchSubmit: () => void;
}

export const ModalForMicroCycleAssembly: React.FC<
  ModalForMicroCycleAssemblyProps
> = ({ isOpen, onClose, exerciseHandlers, handleSearchSubmit }) => {
  const [primaryAbility, setPrimaryAbility] = useState('');
  const [secondaryAbility, setSecondaryAbility] = useState('');

  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const [numberOfMainExercises, setNumberOfMainExercises] = useState(1);
  const [numberOfAccessoryExercises, setNumberOfAccessoryExercises] =
    useState(3);

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

    exerciseHandlers.setToolsAvailableToUserForTraining(toolsForTrainingUsage);

    exerciseHandlers.setTrainingDays(updatedTrainingDays);
    console.log(exerciseHandlers.biomotorAbilitiesUserWantsToTarget);
    console.log(updatedTrainingDays);
    onClose();
  };
  const handleMainExercisesChange = (event: any) => {
    setNumberOfMainExercises(event.target.value);
  };

  const handleAccessoryExercisesChange = (event: any) => {
    setNumberOfAccessoryExercises(event.target.value);
  };
  return (
    <Modal open={isOpen} onClose={onClose}>
      <>
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
          <CustomSelect
            label="Choose primary bio-motor ability"
            value={primaryAbility}
            onChange={handlePrimaryChange}
            options={biomotorAbilitiesToChoose.map(ability => ({
              label: `${ability.name} - ${ability.intensity}`,
              value: ability.name,
            }))}
          />

          <CustomSelect
            label="Choose secondary bio-motor ability"
            value={secondaryAbility}
            onChange={handleSecondaryChange}
            options={biomotorAbilitiesToChoose
              .filter(ability => ability.name !== primaryAbility)
              .map(ability => ({
                label: `${ability.name} - ${ability.intensity}`,
                value: ability.name,
              }))}
          />
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <CustomSelect
              label="Set the number of main exercises"
              value={numberOfMainExercises}
              onChange={handleMainExercisesChange}
              options={[1, 2, 3, 4].map(option => ({
                label: option.toString(),
                value: option,
              }))}
            />

            <CustomSelect
              label="Set the number of accessory exercises"
              value={numberOfAccessoryExercises}
              onChange={handleAccessoryExercisesChange}
              options={[1, 2, 3, 4, 5, 7, 8].map(option => ({
                label: option.toString(),
                value: option,
              }))}
            />
          </Box>
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
      </>
    </Modal>
  );
};
