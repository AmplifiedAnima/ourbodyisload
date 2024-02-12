import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  UpdateUserChosenClassInterface,
  CalendarAppState,
  preExistingClassesInterface,
  UserActivityData,
} from "../../interfaces/calendar.interface";

export const calendarAppInitialState: CalendarAppState = {
  classes: [],
  userChosenClasses: [],
  status: "idle",
  error: null,
  postSuccess: false,
};
interface errorResponse {
  status: number;
  error: string;
}
export const calendarAppStateManagementSlice = createSlice({
  name: "fetchPreExistingClassesFromBackend",
  initialState: calendarAppInitialState,

  reducers: {
    setClasses: (
      state: CalendarAppState,
      action: PayloadAction<preExistingClassesInterface[]>
    ) => {
      state.classes = action.payload;
      state.status = "succeeded";
    },
    setError: (
      state: CalendarAppState,
      action: PayloadAction<string | null>
    ) => {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    resetPostSuccessFlag(state) {
      state.postSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPreExistingClasses.fulfilled, (state, action) => {
      state.classes = action.payload;
    });
    builder.addCase(fetchUserChosenClasses.fulfilled, (state, action) => {
      state.userChosenClasses = action.payload;
    });
    builder.addCase(postUserActivitiesToBackend.fulfilled, (state) => {
      state.postSuccess = true;
    });
    builder.addCase(editUserChosenClass.fulfilled, (state) => {
      state.postSuccess = true;
    });
    builder.addCase(deleteUserActivity.fulfilled, (state) => {
      state.postSuccess = true;
    });
    builder.addCase(postUserActivitiesToBackend.rejected, (state, action) => {
      console.log("create Error payload:", action.payload);
      const payload = action.payload as errorResponse;
      state.error = payload.error;
    });
    builder.addCase(editUserChosenClass.rejected, (state, action) => {
      console.log(`edit error payload`, action.payload);
      const payload = action.payload as errorResponse;
      state.error = payload.error;
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
      return rejectWithValue(error);
    }
  }
);

export const postUserActivitiesToBackend = createAsyncThunk(
  "postUserActivitiesToBackend",
  async (
    { activityId, scheduleTime }: UserActivityData,
    { rejectWithValue, dispatch }
  ) => {
    const formattedScheduleTime = scheduleTime.toISOString();
    const dataToSend = {
      activityId,
      scheduleTime: formattedScheduleTime,
    };
    const token = localStorage.getItem("token");
    console.log("Sending data:", dataToSend);

    try {
      const response = await fetch(
        "http://localhost:3000/user-chosen-classes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Response data:", data);
        dispatch(clearError());
        return data;
      } else {
        throw new Error("Received non-JSON response");
      }
    } catch (error) {
      console.error("Error in postUserActivitiesToBackend:", error);
      return rejectWithValue(`Request failed: ${error}`);
    }
  }
);

export const deleteUserActivity = createAsyncThunk(
  "userActivity/deleteUserActivity",
  async ({ activityId }: { activityId: string }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3000/user-chosen-classes/${activityId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        return await response.json();
      }

      return { activityId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const editUserChosenClass = createAsyncThunk(
  "userChosenClasses/edit",
  async (
    {
      id,
      updateUserChosenClassDto,
    }: { id: string; updateUserChosenClassDto: UpdateUserChosenClassInterface },
    { rejectWithValue, dispatch }
  ) => {
    try {
      console.log(`updated dto edit`, updateUserChosenClassDto.scheduleTime);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/user-chosen-classes/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateUserChosenClassDto),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        return rejectWithValue(errorData);
      }

      const updatedClass = await response.json();
      dispatch(clearError());
      return updatedClass;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
export const { setClasses, clearError, resetPostSuccessFlag } =
  calendarAppStateManagementSlice.actions;

export const calendarAppSlice = {
  ...calendarAppStateManagementSlice.actions,
};

export const calendarAppManagementReducer =
  calendarAppStateManagementSlice.reducer;
