import React, { useState } from 'react';
import { Modal, Button, Typography, Box, TextField } from '@mui/material';
import { ExerciseBlueprintsInterface } from '../../../../interfaces/Exercise.interface';
import InputOneRepMaxCounter from './InputOneRepMaxCounter';
import { ButtonStylingForApp } from '../../../../globalStyles/ButtonStylingForApp';
interface ExerciseTypeModalProps {
  open: boolean;
  onClose: () => void;
  selectedExercise: ExerciseBlueprintsInterface | null;
  sets: string;
  reps: string;
  intensity: string;
  handleSetsChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    exercise: ExerciseBlueprintsInterface
  ) => void;
  handleRepsChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    exercise: ExerciseBlueprintsInterface
  ) => void;
  handleIntensityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSetExerciseType: (type: 'main' | 'accessory') => void;
}

const ExerciseTypeModal: React.FC<ExerciseTypeModalProps> = ({
  open,
  onClose,
  selectedExercise,
  sets,
  reps,
  intensity,
  handleSetsChange,
  handleRepsChange,
  handleIntensityChange,
  handleSetExerciseType,
}) => {
  const [oneRepMaxIntensity, setOneRepMaxIntensity] = useState('');
  const [oneRepMaxEstimateLifted, setOneRepMaxEstimateLifted] = useState('');
  const handleOneRepMaxIntensityEstimate = (event: any) => {
    setOneRepMaxIntensity(event.target.value);
  };

  const handleOneRepMaxWeightsLiftedEstimate = (event: any) => {
    setOneRepMaxEstimateLifted(event.target.value);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          maxWidth: '800px',
          maxHeight: '600px',
          bgcolor: 'background.paper',
          p: 2,
          overflowY: 'auto',
          borderRadius: 1, // you can add a border-radius if you like
          boxShadow: 24, // this adds a shadow to the modal box
        }}
      >
        <InputOneRepMaxCounter
          intensityInput={oneRepMaxIntensity}
          reps={oneRepMaxEstimateLifted}
          handleChangeOfIntensityInput={handleOneRepMaxIntensityEstimate}
          handleChangeOfRepsLifted={handleOneRepMaxWeightsLiftedEstimate}
          selectedExercise={selectedExercise}
        />

        <Typography variant="body1" gutterBottom mb={2}>
          {selectedExercise ? (
            <>
              <Typography sx={{ color: 'purple' }}>
                {selectedExercise.name} | {selectedExercise.movementPattern}{' '}
              </Typography>

              <Typography sx={{ color: 'purple' }}>
                {' '}
                {selectedExercise.type}{' '}
              </Typography>
            </>
          ) : (
            ''
          )}
          to be assigned as main or accessory exercise
        </Typography>
        <Typography variant="body2" gutterBottom mb={0.5}>
          Select how many sets ?
        </Typography>
        <TextField
          label="Sets"
          type="number"
          value={sets}
          placeholder={selectedExercise ? selectedExercise.sets : ''}
          onChange={event => {
            if (selectedExercise) {
              handleSetsChange(event, selectedExercise);
            }
          }}
          fullWidth
          margin="normal"
          inputProps={{ min: 1, max: 10 }}
        />
        <Typography variant="body2" gutterBottom mb={0.5}>
          Select how many reps ?
        </Typography>
        <TextField
          label="Reps"
          type="number"
          value={reps}
          onChange={event => {
            if (selectedExercise) {
              handleRepsChange(event, selectedExercise);
            }
          }}
          placeholder={selectedExercise ? selectedExercise.reps : ''}
          fullWidth
          margin="normal"
          inputProps={{ min: 1, max: 20 }}
        />
        <Typography variant="body2" gutterBottom mb={0.5}>
          at what intensity ?
        </Typography>
        <TextField
          label="Intensity (kg)"
          type="number"
          value={intensity}
          placeholder={selectedExercise ? selectedExercise.intensity : ''}
          onChange={handleIntensityChange}
          fullWidth
          margin="normal"
          inputProps={{ min: 0, step: 0.5 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={() => handleSetExerciseType('main')}
            sx={{ ...ButtonStylingForApp, margin: '10px' }}
          >
            Add as main
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleSetExerciseType('accessory')}
            sx={{ ...ButtonStylingForApp }}
          >
            Add as accessory
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ExerciseTypeModal;
