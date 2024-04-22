import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Select, MenuItem, Box } from '@mui/material';
import { ButtonStylingForApp } from '../../../../globalStyles/ButtonStylingForApp';
import { SearchInput } from '../../HeaderComponent/SearchInput';

import { ExerciseHandlersInterface } from '../../../../interfaces/Exercise.interface';
import arrowRight from './assets/arrow-right-circle.svg';
import arrowLeft from './assets/arrow-left-circle.svg';

interface GridWithOptionsForPeriodizationModalTemplateProps {
  exerciseHandlers: ExerciseHandlersInterface;
  handleSearchSubmit: () => void;
}

const GridWithOptionsForPeriodizationModalTemplate: React.FC<
  GridWithOptionsForPeriodizationModalTemplateProps
> = ({ exerciseHandlers, handleSearchSubmit }) => {
  useEffect(() => {
    console.log(exerciseHandlers.searchingQuery);
  }, [handleSearchSubmit]);

  const isMobile = window.length < 768;

  return (
    <Box>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{
          maxWidth: '1200px',
        }}
      >
        <Typography variant="body1" mr={1}>
          Training Days Per Week
        </Typography>
        <Grid container>
          <Button
            variant="outlined"
            disabled={exerciseHandlers.daysAWeek === '1'}
            sx={{ maxHeight: '30px', padding: '10px' }}
            onClick={() =>
              exerciseHandlers.setDaysAWeek((prev: string) =>
                prev === '1' ? '1' : (parseInt(prev) - 1).toString()
              )
            }
          >
            <img src={arrowLeft} alt="" />
          </Button>
          <Typography variant="body1" mx={1} sx={{ fontSize: '22px' }}>
            {exerciseHandlers.daysAWeek === '1' && 'I'}
            {exerciseHandlers.daysAWeek === '2' && 'II'}
            {exerciseHandlers.daysAWeek === '3' && 'III'}
          </Typography>
          <Button
            variant="outlined"
            disabled={exerciseHandlers.daysAWeek === '3'}
            onClick={() =>
              exerciseHandlers.setDaysAWeek((prev: string) =>
                prev === '3' ? '3' : (parseInt(prev) + 1).toString()
              )
            }
            sx={{ maxHeight: '30px', padding: '10px' }}
          >
            <img src={arrowRight} alt="" />
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="body1" gutterBottom mb={0.5}>
            assign to a given Training day
          </Typography>
          <Select
            value={exerciseHandlers.selectedDay}
            onChange={exerciseHandlers.handleDaySelectionChange}
            displayEmpty
            fullWidth
            variant="outlined"
            sx={{ mb: 2, width: '200px', height: '30px' }}
          >
            {Object.keys(exerciseHandlers.trainingDays).map(day => {
              const dayWithSpace = day.replace(/(\d+)/, ' $1');
              return (
                <MenuItem key={day} value={day}>
                  {dayWithSpace.toUpperCase()}
                </MenuItem>
              );
            })}
          </Select>

          <Typography variant="body1" gutterBottom mb={0.5}>
            Periodization
          </Typography>
          <Select
            value={exerciseHandlers.periodization}
            onChange={exerciseHandlers.handlePeriodizationChange}
            displayEmpty
            fullWidth
            variant="outlined"
            sx={{
              mb: 4,
              width: '200px',
              height: '30px',
            }}
          >
            <MenuItem value="strength">Strength</MenuItem>
            <MenuItem value="hypertrophy">Hypertrophy</MenuItem>
            <MenuItem value="power">Power</MenuItem>
          </Select>
        </Grid>
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
                exerciseHandlers.setIsExerciseListVisible(
                  (prev: boolean) => !prev
                );
              }}
              sx={{ ...ButtonStylingForApp }}
            >
              {exerciseHandlers.isExerciseListVisible
                ? 'close'
                : 'open exercise list'}
            </Button>

            {exerciseHandlers.isExerciseListVisible ? (
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
                      <Typography
                        sx={{ whiteSpace: 'nowrap', fontSize: '14px' }}
                      >
                        {exercise.name}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={1.5}
                      sx={{
                        '@media (max-width:768px)': {
                          display: 'none',
                        },
                      }}
                    >
                      <Typography sx={{ fontSize: '14px' }}>
                        {exercise.type}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={3}
                      sx={{
                        '@media (max-width:768px)': {
                          display: 'none',
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '14px',
                        }}
                      >
                        {exercise.movementPattern}
                      </Typography>
                    </Grid>

                    <Grid item xs={2}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          exerciseHandlers.handleAddExercise(exercise)
                        }
                        sx={{ ...ButtonStylingForApp, ml: 1, height: '25px' }}
                      >
                        ADD
                      </Button>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1">Expand</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GridWithOptionsForPeriodizationModalTemplate;
