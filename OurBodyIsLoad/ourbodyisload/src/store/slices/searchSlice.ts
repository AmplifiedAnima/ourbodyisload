import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciseBlueprintsInterface } from "../../interfaces/Exercise.interface";
import { SearchFunctionalityInterface } from "../../interfaces/Search.interface";

export const searchQueryinitialState = {
  status: "idle",
  exercises: [],
  posts: [],
  searchQuery: "",
  selectedOffer: null,
};

export const searchFunctionalitySlice = createSlice({
  name: "updateQuery",
  initialState: searchQueryinitialState,

  reducers: {
    updateQuery: (
      state: SearchFunctionalityInterface,
      action: PayloadAction<string>
    ) => {
      state.searchQuery = action.payload;
    },
    setIdOfSelectedOffer: (state, action) => {
      state.selectedOffer = action.payload;
    },
    setExercises: (
      state: SearchFunctionalityInterface,
      action: PayloadAction<ExerciseBlueprintsInterface[]>
    ) => {
      state.exercises = action.payload;
      state.status = "suceeded";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchExercises.fulfilled,
      (state: SearchFunctionalityInterface, action) => {
        state.exercises = action.payload;
        state.status = "succeeded";
      }
    );
  },
});

export const fetchExercises = createAsyncThunk(
  "posts/fetchExercises",
  async (searchQuery: string, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ searchQuery });
      
      const response = await fetch(
        `http://localhost:3000/exercises?${params}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error fetching posts");
      }
      const data: ExerciseBlueprintsInterface[] = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("error happend");
    }
  }
);

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (searchQuery: string, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ searchQuery });
      const response = await fetch(`http://localhost:3000/Posts?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching posts");
      }
      const data: ExerciseBlueprintsInterface[] = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("error happend");
    }
  }
);

export const { updateQuery, setExercises } = searchFunctionalitySlice.actions;

export const searchReducer = searchFunctionalitySlice.reducer;
