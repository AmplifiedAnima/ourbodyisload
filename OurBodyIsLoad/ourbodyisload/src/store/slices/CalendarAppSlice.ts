import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  UpdateUserChosenClassInterface,
  calendarAppFunctionalityInterface,
  preExistingClassesInterface,
} from "../../interfaces/calendar.interface";

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
    console.log("Sending data:", dataToSend);

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
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
      const response = await fetch(
        `http://localhost:3000/user-chosen-classes/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Assuming Bearer token authentication
          },
          body: JSON.stringify(updateUserChosenClassDto),
        }
      );

      if (!response.ok) {
        return await response.json();
      }

      const updatedClass = await response.json();
      return updatedClass;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const { setClasses } = calendarAppStateManagementSlice.actions;

export const calendarAppSlice = {
  ...calendarAppStateManagementSlice.actions,
};

export const calendarAppManagementReducer =
  calendarAppStateManagementSlice.reducer;
