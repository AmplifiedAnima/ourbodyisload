import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExercises } from "../../../store/slices/searchSlice";
import { searchFunctionalityInterface } from "../../../interfaces/search.interface";
import { AppDispatch, RootState } from "../../../store/store";
import { Link } from "react-router-dom";
import { AuthState } from "../../../interfaces/auth.interface";
import { LoginToAccessThisPartComponent } from "../LoginToAccessThisPartComponent/LoginToAccessThisPartComponent";
import { StyledActivityCard } from "../ActivityCardComponent/ActivityCard";

export const ExercisesLibraryComponent = () => {
  const authState = useSelector<RootState, AuthState>((state) => state.auth);
  const exercises = useSelector(
    (state: { search: searchFunctionalityInterface }) => state.search.exercises
  );
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector(
    (state: { search: searchFunctionalityInterface }) =>
      state.search.searchQuery
  );

  useEffect(() => {
    if (authState.isLoggedIn) {
      dispatch(fetchExercises(searchQuery));
    }
  }, [searchQuery]);

  return (
    <>
      {authState.isLoggedIn ? (
        <>
          {exercises.map((exercise, index) => (
            <StyledActivityCard>
              <Box
                key={index}
                sx={{
                  borderBottom: "1px solid black",
                  width: "300px",
                  margin: "0px 20px",
                  wordBreak: "break-word",
                  "@media (max-width: 768px)": {
                    width: "auto",
                  },
                  "@media (max-width: 280px)": {
                    width: "260px",
                    margin: "0px 10px",
                  },
                }}
              >
                <Typography variant="h5" sx={{ margin: "10px 0px" }}>
                  {exercise.name === undefined ? "lack of info" : exercise.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    margin: "10px 0px",
                  }}
                >
                  {exercise.sets}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    margin: "10px 0px",
                  }}
                >
                  {exercise.reps}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    margin: "10px 0px",
                  }}
                >
                  <Link to={`http://localhost:3001/exercises/${exercise._id}`}>
                    Check
                  </Link>
                </Typography>
              </Box>
            </StyledActivityCard>
          ))}
        </>
      ) : (
        <LoginToAccessThisPartComponent />
      )}
    </>
  );
};
