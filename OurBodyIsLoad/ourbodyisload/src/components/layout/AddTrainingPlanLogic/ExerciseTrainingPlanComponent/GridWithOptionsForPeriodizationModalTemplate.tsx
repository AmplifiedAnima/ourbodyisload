import React, { useEffect } from 'react';
import { Grid, Typography, Button, Select, MenuItem, Box } from '@mui/material';

import { ExerciseHandlersInterface } from '../../../../interfaces/Exercise.interface';
import arrowRight from './assets/arrow-right-circle.svg';
import arrowLeft from './assets/arrow-left-circle.svg';
import ExerciseListComponent from './ExerciseListComponent';

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
        </Grid>
        <ExerciseListComponent
          isMobile={isMobile}
          exerciseHandlers={exerciseHandlers}
          handleSearchSubmit={handleSearchSubmit}
        />
      </Grid>
    </Box>
  );
};

export default GridWithOptionsForPeriodizationModalTemplate;
