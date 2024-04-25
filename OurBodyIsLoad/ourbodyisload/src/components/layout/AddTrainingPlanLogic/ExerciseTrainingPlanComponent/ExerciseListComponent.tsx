import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { SearchInput } from '../../HeaderComponent/SearchInput'; // adjust the import path as needed
import { ButtonStylingForApp } from '../../../../globalStyles/ButtonStylingForApp'; // adjust import path as needed
import { ExerciseHandlersInterface } from '../../../../interfaces/Exercise.interface';

interface ExerciseListComponentProps {
  exerciseHandlers: ExerciseHandlersInterface;
  handleSearchSubmit: () => void;
  isMobile: boolean;
}

const ExerciseListComponent: React.FC<ExerciseListComponentProps> = ({
  exerciseHandlers,
  handleSearchSubmit,
  isMobile,
}) => {
  return (
    <Grid container>
      <Grid item>
        <Typography variant="h6" mb={1}>
          Available Exercises
        </Typography>
        {exerciseHandlers.isExerciseListVisible && (
          <SearchInput
            handleInputValue={exerciseHandlers.handleInputValue}
            onHandleSearchSubmit={handleSearchSubmit}
            searchQuery={exerciseHandlers.searchingQuery}
          />
        )}
        <Button
          onClick={() => {
            exerciseHandlers.setIsExerciseListVisible(prev => !prev);
          }}
          sx={{ ...ButtonStylingForApp }}
        >
          {exerciseHandlers.isExerciseListVisible
            ? 'Close'
            : 'Open Exercise List'}
        </Button>

        {exerciseHandlers.isExerciseListVisible && (
          <Grid
            container
            spacing={4}
            sx={{
              minWidth: '100vw',
              maxWidth: 'auto',
              height: '300px',
              overflow: 'auto',
              fontSize: '14px',
              '@media (max-width:768px)': {
                width: '90%',
              },
            }}
          >
            {exerciseHandlers.exercises.map(exercise => (
              <React.Fragment key={exercise._id}>
                <Grid item xs={8} md={3} mt={isMobile ? 2 : 0}>
                  <Typography sx={{ whiteSpace: 'nowrap', fontSize: '14px' }}>
                    {exercise.name}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={1.5}
                  sx={{ '@media (max-width:768px)': { display: 'none' } }}
                >
                  <Typography sx={{ fontSize: '14px' }}>
                    {exercise.type}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{ '@media (max-width:768px)': { display: 'none' } }}
                >
                  <Typography sx={{ fontSize: '14px' }}>
                    {exercise.movementPattern}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => exerciseHandlers.handleAddExercise(exercise)}
                    sx={{ ...ButtonStylingForApp, ml: 1, height: '25px' }}
                  >
                    ADD
                  </Button>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ExerciseListComponent;
