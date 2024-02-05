import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./slices/searchSlice";
import { authSliceReducer } from "./slices/authSlice";
import { calendarAppManagementReducer } from "./slices/CalendarAppSlice";
export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authSliceReducer,
    calendarApp: calendarAppManagementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
