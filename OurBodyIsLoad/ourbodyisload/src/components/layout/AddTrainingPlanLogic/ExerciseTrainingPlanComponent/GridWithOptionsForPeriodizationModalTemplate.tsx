import React, { useState } from "react";
import { Grid, Typography, Button, Select, MenuItem, Box } from "@mui/material";
import { ButtonStylingForApp } from "../../../../globalStyles/ButtonStylingForApp";
import { SearchInput } from "../../HeaderComponent/SearchInput";
import { TablesTemplateComponent } from "../TablesTemplateComponent";
import { ExerciseBlueprintsInterface } from "../../../../interfaces/Exercise.interface";
import { ExerciseHandlersInterface } from "../../../../interfaces/Exercise.interface";

interface GridWithOptionsForPeriodizationModalTemplateProps {
  exerciseHandlers: ExerciseHandlersInterface;
  exercises: ExerciseBlueprintsInterface[];
  handleSearchSubmit: () => void;
}

const GridWithOptionsForPeriodizationModalTemplate: React.FC<
  GridWithOptionsForPeriodizationModalTemplateProps
> = ({ exerciseHandlers, exercises, handleSearchSubmit }) => {
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
              spacing={2}
              sx={{
                width: "550px",
                height: "300px",
                overflow: "auto",
                "@media(max-width:768px)": {
                  width: "100%",
                },
              }}
            >
              {exercises.map((exercise) => (
                <React.Fragment key={exercise._id}>
                  <Grid item xs={4}>
                    <Typography>{exercise.name}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>{exercise.type}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>{exercise.movementPattern}</Typography>
                  </Grid>
                  <Grid item xs={3}>
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
        {/* 
        <Grid item md={6} sx={{ maxHeight: "400px" }}>
        <Typography variant="h6">Template</Typography> */}
        {/* <Box
            sx={{
              height: "550px",
              overflow: "auto",
              margin: "5px 10px",
              "@media(max-width:768px)": {
                height: "400px",
                width: "100%",
                margin: "0px 0px",
              },
            }}
          >
            {Object.keys(exerciseHandlers.trainingDays).map((day) => (
              <TablesTemplateComponent
                key={day}
                dayLabel={day}
                mainExercises={exerciseHandlers.trainingDays[day].main}
                accessoryExercises={
                  exerciseHandlers.trainingDays[day].accessory
                }
              />
            ))}
          </Box> */}
        {/* </Grid> */}
      </Grid>
    </Box>
  );
};

export default GridWithOptionsForPeriodizationModalTemplate;
