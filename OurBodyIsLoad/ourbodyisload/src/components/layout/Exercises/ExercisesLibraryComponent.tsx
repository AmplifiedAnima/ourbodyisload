import { Box, CardContent, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExercises } from "../../../store/slices/searchSlice";
import { searchFunctionalityInterface } from "../../../interfaces/search.interface";
import { AppDispatch, RootState } from "../../../store/store";
import { Link } from "react-router-dom";
import { authState } from "../../../interfaces/auth.interface";
import { LoginToAccessThisPartComponent } from "../LoginToAccessThisPartComponent/LoginToAccessThisPartComponent";
import { exerciseBlueprintsInterface } from "../../../interfaces/exercise.interface";

export const ExercisesLibraryComponent = () => {
  const authState = useSelector<RootState, authState>((state) => state.auth);
  const exercises = useSelector(
    (state: { search: searchFunctionalityInterface }) => state.search.exercises
  );
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector(
    (state: { search: searchFunctionalityInterface }) =>
      state.search.searchQuery
  );

  // interface GroupedExercises {
  //   [category: string]: exerciseBlueprintsInterface[];
  // }

  // const groupedExercises: GroupedExercises = exercises.reduce(
  //   (acc: GroupedExercises, exercise) => {
  //     const category = exercise.movementPattern;

  //     if (!acc[category]) {
  //       acc[category] = [];
  //     }
  //     acc[category].push(exercise);

  //     return acc;
  //   },
  //   {}
  // );
  useEffect(() => {
    if (authState.isLoggedIn) {
      dispatch(fetchExercises(searchQuery));
    }
  }, [searchQuery]);

  return (
    <>
      {authState.isLoggedIn ? (
        <Grid container spacing={2}>
          {exercises.map((exercise, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              sx={{
                "@media(max-width: 768px)": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100vw",
                },
                "@media (max-width: 280px)": {
                  width: "260px",
                  margin: "0px 10px",
                },
              }}
            >
              <CardContent>
                <Box key={index}>
                  <Typography variant="h5" sx={{ margin: "10px 0px" }}>
                    {exercise.name === undefined
                      ? "lack of info"
                      : exercise.name.toLowerCase()}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      margin: "10px 0px",
                    }}
                  >
                    {exercise.plane}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      margin: "10px 0px",
                    }}
                  >
                    {exercise.movementPattern}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      margin: "10px 0px",
                    }}
                  >
                    {exercise.type}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      margin: "10px 0px",
                    }}
                  >
                    <Link
                      to={`http://localhost:3001/exercises/${exercise._id}`}
                    >
                      Check
                    </Link>
                  </Typography>
                </Box>
              </CardContent>
            </Grid>
          ))}
        </Grid>
      ) : (
        <LoginToAccessThisPartComponent />
      )}
    </>
  );
};
