import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { exerciseInterface } from "../../interfaces/interfaces";

export interface preExistingClassesInterface {
  _id: string;
  id: string;
  name: string;
  description: string;
  videoUrl: string;
}

export interface UserChosenClassesInterface {
  _id: string;
  preExistingClassName: string;
  preExistingClassVideoUrl: string;
  userOwnerId: string;
  scheduleTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface calendarAppFunctionalityInterface {
  classes: preExistingClassesInterface[];
  userChosenClasses: UserChosenClassesInterface[];
  exercises: exerciseInterface[];
  status: string;
}

export const calendarAppInitialState: calendarAppFunctionalityInterface = {
  classes: [],
  userChosenClasses: [],
  exercises: [],
  status: "idle",
};

export const calendarAppStateManagementSlice = createSlice({
  name: "fetchPreExistingClassesFromBackend",
  initialState: calendarAppInitialState,

  reducers: {
    setClasses: (
      state: calendarAppFunctionalityInterface,
      action: PayloadAction<preExistingClassesInterface[]>
    ) => {
      state.classes = action.payload;
      state.status = "succeeded";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPreExistingClasses.fulfilled, (state, action) => {
      state.classes = action.payload;
    });
    builder.addCase(fetchUserChosenClasses.fulfilled, (state, action) => {
      state.userChosenClasses = action.payload;
    });
  },
});

export const fetchPreExistingClasses = createAsyncThunk(
  "fetchPreExistingClasses",
  async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/pre-existing-classes`,
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
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return "error happened";
    }
  }
);

export const fetchUserChosenClasses = createAsyncThunk(
  "fetchUserChosenClasses", 
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/user-chosen-classes/user-classes`, 
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Error fetching user-chosen classes: ${response.status}`
        );
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error || "An error occurred");
    }
  }
);

interface UserActivityData {
  activityId: string;
  scheduleTime: Date;
}

export const postUserActivitiesToBackend = createAsyncThunk(
  "postUserActivitiesToBackend",
  async ({ activityId, scheduleTime }: UserActivityData) => {
    const formattedScheduleTime = scheduleTime.toISOString();
    const dataToSend = {
      activityId,
      scheduleTime: formattedScheduleTime,
    };
    const token = localStorage.getItem("token");
    console.log("Sending data:", dataToSend); // Debugging line

    try {
      const response = await fetch(
        `http://localhost:3000/user-chosen-classes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Response data:", data);
        return data;
      } else {
        const errorText = await response.text();
        console.error("Non-JSON Error response:", errorText);
        throw new Error(`Non-JSON Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error in postUserActivitiesToBackend:", error);
      throw error;
    }
  }
);

export const { setClasses } = calendarAppStateManagementSlice.actions;

export const calendarAppSlice = {
  ...calendarAppStateManagementSlice.actions,
};

export const calendarAppManagementReducer =
  calendarAppStateManagementSlice.reducer;
