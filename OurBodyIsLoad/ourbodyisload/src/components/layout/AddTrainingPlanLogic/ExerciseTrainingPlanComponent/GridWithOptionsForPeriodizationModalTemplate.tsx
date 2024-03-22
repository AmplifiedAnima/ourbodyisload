import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Select, MenuItem, Box } from "@mui/material";
import { ButtonStylingForApp } from "../../../../globalStyles/ButtonStylingForApp";
import { SearchInput } from "../../HeaderComponent/SearchInput";

import { ExerciseHandlersInterface } from "../../../../interfaces/Exercise.interface";

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

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item md={4}>
          <Typography variant="h6" mr={2}>
            Training Days Per Week
          </Typography>
          <Grid item sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Button
              variant="outlined"
              disabled={exerciseHandlers.daysAWeek === "1"}
              sx={{
                ...ButtonStylingForApp,
                height: "45px",
                width: "45px",
                fontSize: "30px",
                marginRight: "12px",
              }}
              onClick={() =>
                exerciseHandlers.setDaysAWeek((prev: string) =>
                  prev === "1" ? "1" : (parseInt(prev) - 1).toString()
                )
              }
            >
              -
            </Button>
            <Typography variant="body1" mx={1} sx={{ fontSize: "22px" }}>
              {exerciseHandlers.daysAWeek === "1" && "I"}
              {exerciseHandlers.daysAWeek === "2" && "II"}
              {exerciseHandlers.daysAWeek === "3" && "III"}
            </Typography>
            <Button
              variant="outlined"
              disabled={exerciseHandlers.daysAWeek === "3"}
              sx={{
                ...ButtonStylingForApp,
                height: "45px",
                width: "45px",
                fontSize: "30px",
                marginLeft: "12px",
              }}
              onClick={() =>
                exerciseHandlers.setDaysAWeek((prev: string) =>
                  prev === "3" ? "3" : (parseInt(prev) + 1).toString()
                )
              }
            >
              +
            </Button>
          </Grid>
          <Grid container spacing={4}>
            <Grid item md={6} xs={10}>
              <Typography variant="h6" gutterBottom mb={0.5}>
                Training day
              </Typography>
              <Select
                value={exerciseHandlers.selectedDay}
                onChange={exerciseHandlers.handleDaySelectionChange}
                displayEmpty
                fullWidth
                variant="outlined"
                sx={{ mb: 2, width: "200px", height: "30px" }}
              >
                {Object.keys(exerciseHandlers.trainingDays).map((day) => {
                  const dayWithSpace = day.replace(/(\d+)/, " $1");
                  return (
                    <MenuItem key={day} value={day}>
                      {dayWithSpace.toUpperCase()}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>

            <Grid item md={6} xs={10}>
              <Typography variant="h6" gutterBottom mb={0.5}>
                Periodization
              </Typography>
              <Select
                value={exerciseHandlers.periodization}
                onChange={exerciseHandlers.handlePeriodizationChange}
                displayEmpty
                fullWidth
                variant="outlined"
                sx={{ mb: 4, width: "200px", height: "30px" }}
              >
                <MenuItem value="strength">Strength</MenuItem>
                <MenuItem value="hypertrophy">Hypertrophy</MenuItem>
                <MenuItem value="power">Power</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h6" mb={1}>
              Available Exercises
            </Typography>
            <SearchInput
              handleInputValue={exerciseHandlers.handleInputValue}
              onHandleSearchSubmit={handleSearchSubmit}
              searchQuery={exerciseHandlers.searchingQuery}
            />
            <Button
              onClick={() => {
                exerciseHandlers.setIsExerciseListVisible(
                  (prev: boolean) => !prev
                );
              }}
              sx={{ ...ButtonStylingForApp }}
            >
              {exerciseHandlers.isExerciseListVisible
                ? "close"
                : "open exercise list"}
            </Button>
          </Grid>
          {exerciseHandlers.isExerciseListVisible ? (
            <Grid
              container
              spacing={4}
              sx={{
                minWidth: "100vw",
                maxWidth: "auto",
                height: "300px",
                overflow: "auto",
                fontSize: "14px",
                "@media(max-width:768px)": {
                  width: "100%",
                },
              }}
            >
              {exerciseHandlers.exercises.map((exercise) => (
                <React.Fragment key={exercise._id}>
                  <Grid item xs={5}>
                    <Typography sx={{ whiteSpace: "nowrap", fontSize: "14px" }}>
                      {exercise.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={1.5}>
                    <Typography sx={{ fontSize: "14px" }}>
                      {exercise.type}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ fontSize: "14px" }}>
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
                      sx={{ ...ButtonStylingForApp, ml: 1, height: "25px" }}
                    >
                      ADD
                    </Button>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">
              Expand the list to see exercises
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default GridWithOptionsForPeriodizationModalTemplate;
