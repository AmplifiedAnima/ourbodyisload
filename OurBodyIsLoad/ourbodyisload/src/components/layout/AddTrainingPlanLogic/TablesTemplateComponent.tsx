import React from "react";
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit"; // Import the EditIcon
import { ExerciseBlueprintsInterface } from "../../../interfaces/Exercise.interface";

interface TablesTemplateComponentProps {
  mainExercises: ExerciseBlueprintsInterface[];
  accessoryExercises: ExerciseBlueprintsInterface[];
  dayLabel: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedExercise: ExerciseBlueprintsInterface) => void; // Add onUpdate callback
}

export const TablesTemplateComponent: React.FC<
  TablesTemplateComponentProps
> = ({ mainExercises, accessoryExercises, dayLabel, onDelete, onUpdate }) => {
  const handleDelete = (id: string) => {
    onDelete(id);
  };
  const handleUpdate = (
    id: string,
    updatedExercise: ExerciseBlueprintsInterface
  ) => {
    onUpdate(id, updatedExercise);
  };
  let totalTonnageMainExercises = 0;
  let totalTonnageAccesories = 0;
  return (
    <>
      <Typography
        variant="subtitle1"
        sx={{
          color: "#530185",
          margin: "15px 20px",
          fontSize: { xs: "14px", sm: "16px" },
          "@media (max-width:768px)": {
            fontSize: "12px",
          },
        }}
      >
        {`Training day ${dayLabel.replace(/[^\d]/g, "")}`}
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          margin: "5px 5px",
          background:
            "linear-gradient(to left, rgba(235, 207, 252, 0.6) 0%, rgba(215, 174, 251, 0.3) 60%, rgba(255, 255, 255, 1) 70%)",
        }}
      >
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#530185",
                  "@media (max-width:768px)": { fontSize: "12px" },
                }}
              >
                MAIN EXERCISE
              </TableCell>
              <TableCell
                sx={{
                  color: "#530185",
                  fontWeight: "bold",
                  "@media (max-width:768px)": { fontSize: "12px" },
                }}
              >
                Sets
              </TableCell>
              <TableCell
                sx={{
                  color: "#530185",
                  fontWeight: "bold",
                  "@media (max-width:768px)": { fontSize: "12px" },
                }}
              >
                Reps
              </TableCell>
              <TableCell
                sx={{
                  color: "#530185",
                  fontWeight: "bold",
                  "@media (max-width:768px)": { fontSize: "12px" },
                }}
              >
                Intensity
              </TableCell>
              <TableCell
                sx={{
                  color: "#530185",
                  fontWeight: "bold",
                  "@media (max-width:768px)": { fontSize: "12px" },
                }}
              >
                Pattern
              </TableCell>
              <TableCell
                sx={{
                  color: "#530185",
                  fontWeight: "bold",
                  "@media (max-width:768px)": { fontSize: "12px" },
                }}
              >
                Load{" "}
              </TableCell>
              <TableCell
                sx={{
                  color: "#530185",
                  fontWeight: "bold",
                  "@media (max-width:768px)": { fontSize: "12px" },
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ width: "auto", whiteSpace: "nowrap" }}>
            {mainExercises.map((exercise, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    color: "#530185",
                    whiteSpace: "nowrap",
                    "@media (max-width:768px)": { fontSize: "12px" },
                  }}
                >
                  {exercise.name}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#530185",
                    "@media (max-width:768px)": { fontSize: "12px" },
                  }}
                >
                  {exercise.sets}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#530185",
                    "@media (max-width:768px)": { fontSize: "12px" },
                  }}
                >
                  {exercise.reps}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#530185",
                    "@media (max-width:768px)": { fontSize: "12px" },
                  }}
                >
                  {exercise.intensity} kg
                </TableCell>
                <TableCell
                  sx={{
                    color: "#530185",
                    "@media (max-width:768px)": { fontSize: "12px" },
                  }}
                >
                  {exercise.movementPattern}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#530185",
                    "@media (max-width:768px)": { fontSize: "12px" },
                  }}
                >
                  {Number(exercise.sets) *
                    Number(exercise.reps) *
                    Number(exercise.intensity)}{" "}
                  kg
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(exercise._id)}>
                    <CloseIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleUpdate(exercise._id, exercise)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell
                sx={{
                  color: "#530185",
                  whiteSpace: "nowrap",
                  fontWeight: "bold",
                  padding: "30px 15px",
                  "@media (max-width:768px)": {
                    fontSize: "12px",
                  },
                }}
              >
                MAIN EXERCISES TOTAL LOAD
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell sx={{ fontWeight: "bold", color: "#530185" }}>
                {mainExercises.map((exercise, index) => {
                  const singleExercise = mainExercises[index];
                  const tonnage =
                    Number(singleExercise.sets) *
                    Number(singleExercise.reps) *
                    Number(singleExercise.intensity);

                  totalTonnageMainExercises += tonnage;
                  return null;
                })}
                {totalTonnageMainExercises} kg
              </TableCell>
            </TableRow>
          </TableBody>

          <TableRow>
            <TableCell colSpan={5}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#530185", fontWeight: "bold" }}
              >
                ACCESORY EXERCISE
              </Typography>
            </TableCell>
          </TableRow>
          <TableBody>
            {accessoryExercises.map((exercise, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    color: "#530185",
                    whiteSpace: "nowrap",
                    "@media (max-width:768px)": { fontSize: "12px" },
                  }}
                >
                  {exercise.name}
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    "@media (max-width:768px)": { fontSize: "12px" },
                  }}
                >
                  {exercise.sets}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#530185",
                    whiteSpace: "nowrap",
                    "@media (max-width:768px)": { fontSize: "12px" },
                  }}
                >
                  {exercise.reps}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#530185",
                    whiteSpace: "nowrap",
                    "@media (max-width:768px)": { fontSize: "12px" },
                  }}
                >
                  {exercise.intensity} kg
                </TableCell>
                <TableCell
                  sx={{
                    color: "#530185",
                    whiteSpace: "nowrap",
                    "@media (max-width:768px)": { fontSize: "12px" },
                  }}
                >
                  {exercise.movementPattern}
                </TableCell>
                <TableCell sx={{ color: "#530185" }}>
                  {Number(exercise.sets) *
                    Number(exercise.reps) *
                    Number(exercise.intensity)}{" "}
                  kg
                </TableCell>
                <TableCell
                  sx={{
                    color: "#530185",
                    whiteSpace: "nowrap",
                    "@media (max-width:768px)": { fontSize: "12px" },
                  }}
                >
                  <IconButton onClick={() => handleDelete(exercise._id)}>
                    <CloseIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleUpdate(exercise._id, exercise)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell
                sx={{
                  color: "#530185",
                  whiteSpace: "nowrap",
                  fontWeight: "bold",
                  padding: "30px 15px",
                  "@media (max-width:768px)": {
                    fontSize: "12px",
                  },
                }}
              >
                ACCESORY TOTAL LOAD
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell sx={{ fontWeight: "bold", color: "#530185" }}>
                {accessoryExercises.map((exercise, index) => {
                  const singleExercise = accessoryExercises[index];
                  const tonnage =
                    Number(singleExercise.sets) *
                    Number(singleExercise.reps) *
                    Number(singleExercise.intensity);
                  totalTonnageAccesories += tonnage;
                  return null;
                })}
                {totalTonnageAccesories} kg
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
