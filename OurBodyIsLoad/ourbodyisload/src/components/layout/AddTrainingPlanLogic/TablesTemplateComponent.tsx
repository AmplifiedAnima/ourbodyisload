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
import { exerciseBlueprintsInterface } from "../../../interfaces/exercise.interface";

interface TablesTemplateComponentProps {
  mainExercises: exerciseBlueprintsInterface[];
  accessoryExercises: exerciseBlueprintsInterface[];
  dayLabel: string;
}

export const TablesTemplateComponent: React.FC<
  TablesTemplateComponentProps
> = ({ mainExercises, accessoryExercises, dayLabel }) => {
  return (
    <Box sx={{ mb: 4, width: "auto" }}>
      <Typography variant="subtitle1">
        {`Training day ${dayLabel.replace(/[^\d]/g, "")}`}{" "}
        {/* Extracts only the digits */}
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Main Exercises</TableCell>
              <TableCell>Sets</TableCell>
              <TableCell>Reps</TableCell>
              <TableCell>Intensity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mainExercises.map((exercise, index) => (
              <TableRow key={index}>
                <TableCell>{exercise.name}</TableCell>
                <TableCell>{exercise.sets}</TableCell>
                <TableCell>{exercise.reps}</TableCell>
                <TableCell>{exercise.intensity} kg</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Accessory Exercises</TableCell>
              <TableCell>Sets</TableCell>
              <TableCell>Reps</TableCell>
              <TableCell>Intensity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accessoryExercises.map((exercise, index) => (
              <TableRow key={index}>
                <TableCell>{exercise.name}</TableCell>
                <TableCell>{exercise.sets}</TableCell>
                <TableCell>{exercise.reps}</TableCell>
                <TableCell>{exercise.intensity} kg</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
