import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { exerciseInterface } from "../../interfaces/interfaces";

export const searchQueryinitialState = {
  status: "idle",
  exercises: [],
  posts: [],
  searchQuery: "",
  selectedOffer: null,
};

export type searchFunctionalityInterface = {
  exercises: exerciseInterface[];
  posts: {};
  searchQuery: string;
  status: string;
  selectedOffer: exerciseInterface | null;
};

export const searchFunctionalitySlice = createSlice({
  name: "updateQuery",
  initialState: searchQueryinitialState,

  reducers: {
    updateQuery: (
      state: searchFunctionalityInterface,
      action: PayloadAction<string>
    ) => {
      state.searchQuery = action.payload;
    },
    setIdOfSelectedOffer: (state, action) => {
      state.selectedOffer = action.payload;
    },
    setExercises: (
      state: searchFunctionalityInterface,
      action: PayloadAction<exerciseInterface[]>
    ) => {
      state.exercises = action.payload;
      state.status = "suceeded";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchExercises.fulfilled,
      (state: searchFunctionalityInterface, action) => {
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
      const data: exerciseInterface[] = await response.json();
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
      const data: exerciseInterface[] = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("error happend");
    }
  }
);

export const { updateQuery, setExercises } = searchFunctionalitySlice.actions;

export const searchReducer = searchFunctionalitySlice.reducer;
