import React, { useEffect, useState } from 'react';
import { Modal, Button, Box, Grid } from '@mui/material';
import { ChosenExercises } from '../../../../interfaces/Exercise.interface';
import { ButtonStylingForApp } from '../../../../globalStyles/ButtonStylingForApp';
import ExerciseTypeModal from './ExerciseTypeModal';
import GridWithOptionsForPeriodizationModalTemplate from './GridWithOptionsForPeriodizationModalTemplate';
import useExerciseHandlers from './utils/useExerciseHandlers';
import { ModalForMicroCycleAssembly } from './ModalForMicroCycleAssembly/ModalForMicroCycleAssembly';
import { TablesTemplateComponent } from '../TablesTemplateComponent';
import { useDispatch } from 'react-redux';
import { updateQuery } from '../../../../store/slices/searchSlice';

interface ModalWithExercisesChoiceProps {
  isOpen: boolean;
  onClose: () => void;
  onChooseExercises: (chosenExercises: ChosenExercises) => void;
}

export const ModalForCreatingPeriodizedTemplate: React.FC<
  ModalWithExercisesChoiceProps
> = ({ isOpen, onClose, onChooseExercises }) => {
  const exerciseHandlers = useExerciseHandlers();
  const [isAssemblyModalOpen, setIsAssemblyModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSearchSubmit = () => {
    exerciseHandlers.setSearchingQuery(exerciseHandlers.searchingQuery);
    dispatch(updateQuery(exerciseHandlers.searchingQuery));
    console.log(exerciseHandlers.searchingQuery);
  };
  useEffect(() => {
    console.log(exerciseHandlers.trainingDays);
  }, [exerciseHandlers]);
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          bgcolor: 'background.paper',

          p: 4,
          overflowY: 'auto',
        }}
      >
        <Grid>
          <Grid item xs={10}>
            <Box
              sx={{
                height: { xs: '400px', sm: '550px' },
                overflowY: 'auto',
                overflowX: 'hidden',

                maxWidth: { xs: '100%', sm: '768px', md: '1400px' },

                '@media (max-width:768px)': {
                  maxWidth: '500px',
                  width: '90%',
                },
                '@media (min-width:769px)': {
                  height: '550px',
                  width: '90%',
                },
              }}
            >
              <GridWithOptionsForPeriodizationModalTemplate
                exerciseHandlers={exerciseHandlers}
                handleSearchSubmit={handleSearchSubmit}
              />
              <Grid item md={12} sx={{ maxWidth: 'auto' }}>
                <Button
                  sx={{
                    ...ButtonStylingForApp,
                    mt: 2,
                  }}
                  onClick={() => setIsAssemblyModalOpen(true)}
                >
                  Assemble training cycle
                </Button>
                {isAssemblyModalOpen && (
                  <ModalForMicroCycleAssembly
                    isOpen={isAssemblyModalOpen}
                    onClose={() => setIsAssemblyModalOpen(false)}
                    exerciseHandlers={exerciseHandlers}
                    handleSearchSubmit={handleSearchSubmit}
                  />
                )}
              </Grid>
              {Object.keys(exerciseHandlers.trainingDays).map(day => (
                <TablesTemplateComponent
                  key={day}
                  dayLabel={day}
                  mainExercises={exerciseHandlers.trainingDays[day].main}
                  accessoryExercises={
                    exerciseHandlers.trainingDays[day].accessory
                  }
                  onDelete={exerciseHandlers.handleDeleteExercise}
                  onUpdate={exerciseHandlers.handleUpdateExercise}
                />
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            onClick={() =>
              exerciseHandlers.handleChooseExercises(onChooseExercises, onClose)
            }
            sx={{ ...ButtonStylingForApp, ml: 1 }}
          >
            Choose Selected
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ ...ButtonStylingForApp, ml: 1 }}
          >
            Cancel
          </Button>
        </Box>

        <ExerciseTypeModal exerciseHandlers={exerciseHandlers} />
      </Box>
    </Modal>
  );
};
