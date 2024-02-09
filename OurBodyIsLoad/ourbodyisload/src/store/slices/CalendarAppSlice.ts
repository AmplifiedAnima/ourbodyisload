import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  UpdateUserChosenClassInterface,
  CalendarAppState,
  preExistingClassesInterface,
} from "../../interfaces/calendar.interface";

export const calendarAppInitialState: CalendarAppState = {
  classes: [],
  userChosenClasses: [],
  status: "idle",
  error: null,
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPreExistingClasses.fulfilled, (state, action) => {
      state.classes = action.payload;
    });
    builder.addCase(fetchUserChosenClasses.fulfilled, (state, action) => {
      state.userChosenClasses = action.payload;
    });
    builder.addCase(postUserActivitiesToBackend.rejected, (state, action) => {
      console.log("Error payload:", action.payload);
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

interface UserActivityData {
  activityId: string;
  scheduleTime: Date;
}

export const postUserActivitiesToBackend = createAsyncThunk(
  "postUserActivitiesToBackend",
  async (
    { activityId, scheduleTime }: UserActivityData,
    { rejectWithValue }
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
    { rejectWithValue }
  ) => {
    try {
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
      console.log(id, updateUserChosenClassDto);
      if (!response.ok) {
        const errorData = await response.json();

        return rejectWithValue(
          errorData.message || "An unknown error occurred"
        );
      }

      const updatedClass = await response.json();
      return updatedClass;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
export const { setClasses } = calendarAppStateManagementSlice.actions;

export const calendarAppSlice = {
  ...calendarAppStateManagementSlice.actions,
};

export const calendarAppManagementReducer =
  calendarAppStateManagementSlice.reducer;
