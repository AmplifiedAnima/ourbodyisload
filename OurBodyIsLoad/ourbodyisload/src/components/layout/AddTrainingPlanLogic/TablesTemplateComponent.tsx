import React from "react";
import {
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { ExerciseBlueprintsInterface } from "../../../interfaces/Exercise.interface";

interface TablesTemplateComponentProps {
  mainExercises: ExerciseBlueprintsInterface[];
  accessoryExercises: ExerciseBlueprintsInterface[];
  dayLabel: string;
}

export const TablesTemplateComponent: React.FC<
  TablesTemplateComponentProps
> = ({ mainExercises, accessoryExercises, dayLabel }) => {
  return (
    <Box sx={{ margin: "10px", width: "auto" }}>
      <Typography
        variant="subtitle1"
        sx={{ color: "#530185", margin: "15px 20px" }}
      >
        {`Training day ${dayLabel.replace(/[^\d]/g, "")}`}{" "}
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          margin: "5px 5px",
          background:
            "linear-gradient(to left, rgba(235, 207, 252, 0.6) 0%, rgba(215, 174, 251, 0.3) 60%, rgba(255, 255, 255, 1) 70%)",
          width: "auto",
        }}
      >
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#530185" }}>Main exercise</TableCell>
              <TableCell sx={{ color: "#530185" }}>Sets</TableCell>
              <TableCell sx={{ color: "#530185" }}>Reps</TableCell>
              <TableCell sx={{ color: "#530185" }}>Intensity</TableCell>
              <TableCell sx={{ color: "#530185" }}>Pattern </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {mainExercises.map((exercise, index) => (
              <>
                <TableRow key={index}>
                  <TableCell sx={{ color: "#530185" }}>
                    {exercise.name}
                  </TableCell>
                  <TableCell>{exercise.sets}</TableCell>
                  <TableCell>{exercise.reps}</TableCell>
                  <TableCell>{exercise.intensity} kg</TableCell>
                  <TableCell>{exercise.movementPattern}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
          <TableRow sx={{ height: "10px" }} />
          <TableBody>
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant="subtitle1" sx={{ color: "#530185" }}>
                  Accessory
                </Typography>
              </TableCell>
            </TableRow>
            {accessoryExercises.map((exercise, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "#530185" }}>{exercise.name}</TableCell>
                <TableCell>{exercise.sets}</TableCell>
                <TableCell>{exercise.reps}</TableCell>
                <TableCell>{exercise.intensity} kg</TableCell>
                <TableCell>{exercise.movementPattern}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
