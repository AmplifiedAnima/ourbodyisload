import React, { useState } from 'react';
import { Modal, Button, Typography, Box, TextField } from '@mui/material';
import { ExerciseHandlersInterface } from '../../../../interfaces/Exercise.interface';
import InputOneRepMaxCounter from './InputOneRepMaxCounter';
import { ButtonStylingForApp } from '../../../../globalStyles/ButtonStylingForApp';

interface ExerciseTypeModalProps {
  exerciseHandlers: ExerciseHandlersInterface;
}

const ExerciseTypeModal: React.FC<ExerciseTypeModalProps> = ({
  exerciseHandlers,
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
    <Modal
      open={exerciseHandlers.exerciseTypeModalOpen}
      onClose={exerciseHandlers.handleCloseExerciseTypeModal}
    >
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
          selectedExercise={exerciseHandlers.selectedExercise}
        />

        <Typography variant="body1" gutterBottom mb={2}>
          {exerciseHandlers.selectedExercise ? (
            <>
              <Typography sx={{ color: 'purple' }}>
                {exerciseHandlers.selectedExercise.name} |{' '}
                {exerciseHandlers.selectedExercise.movementPattern}{' '}
              </Typography>

              <Typography sx={{ color: 'purple' }}>
                {' '}
                {exerciseHandlers.selectedExercise.type}{' '}
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
          value={exerciseHandlers.sets}
          placeholder={
            exerciseHandlers.selectedExercise
              ? exerciseHandlers.selectedExercise.sets
              : ''
          }
          onChange={event => {
            if (exerciseHandlers.selectedExercise) {
              exerciseHandlers.handleSetsChange(
                event,
                exerciseHandlers.selectedExercise
              );
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
          value={exerciseHandlers.reps}
          onChange={event => {
            if (exerciseHandlers.selectedExercise) {
              exerciseHandlers.handleRepsChange(
                event,
                exerciseHandlers.selectedExercise
              );
            }
          }}
          placeholder={
            exerciseHandlers.selectedExercise
              ? exerciseHandlers.selectedExercise.reps
              : ''
          }
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
          value={exerciseHandlers.intensity}
          placeholder={
            exerciseHandlers.selectedExercise
              ? exerciseHandlers.selectedExercise.intensity
              : ''
          }
          onChange={exerciseHandlers.handleIntensityChange}
          fullWidth
          margin="normal"
          inputProps={{ min: 0, step: 0.5 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={() => exerciseHandlers.handleSetExerciseType('main')}
            sx={{ ...ButtonStylingForApp, margin: '10px' }}
          >
            Add as main
          </Button>
          <Button
            variant="outlined"
            onClick={() => exerciseHandlers.handleSetExerciseType('accessory')}
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
