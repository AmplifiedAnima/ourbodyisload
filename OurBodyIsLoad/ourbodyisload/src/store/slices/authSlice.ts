import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { UpdateProfileData } from "../../components/layout/EditProfileComponent/EditProfileComponent";
import { AuthState } from "../../interfaces/auth.interface";
import { errorResponse } from "../../interfaces/error.interface";

export const initialAuthState: AuthState = {
  username: "",
  isLoggedIn: false,
  accessToken: "",
  email: "",
  roles: [],
  avatarImageUrl: "",
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setIsLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setUsername: (state, action) => {
      state.username = action.payload.username;
    },
    setEmail: (state, action) => {
      state.email = action.payload.email;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    setAvatarImageUrl: (state, action) => {
      state.avatarImageUrl = action.payload.avatarImageUrl;
    },
    setIsLogout: (state) => {
      state.username = initialAuthState.username;
      state.isLoggedIn = initialAuthState.isLoggedIn;
      state.accessToken = initialAuthState.accessToken;
      state.email = initialAuthState.email;
      state.roles = initialAuthState.roles;
      state.avatarImageUrl = initialAuthState.avatarImageUrl;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.rejected, (state, action) => {
      console.log("create Error payload:", action.payload);
      const payload = action.payload as errorResponse;
      state.error = payload.error;
    });
  },
});

export const initializeIsLoggedInState =
  () => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    const refreshAuthToken = async (token: string) => {
      console.log(token);
      try {
        const response = await fetch(
          "http://localhost:3000/auth/refresh-token",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to refresh token:", errorData);
          throw new Error("Failed to refresh token");
        }

        const { accessToken: newToken } = await response.json();
        console.log(`Token refreshed successfully. New token:`, newToken);
        localStorage.setItem("token", newToken);
        return newToken;
      } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
      }
    };

    if (token) {
      console.log("Attempting to refresh token...");
      try {
        const newToken = await refreshAuthToken(token);
        dispatch(setToken({ accessToken: newToken }));
        dispatch(setIsLoggedIn());
      } catch (error) {
        console.log("Refreshing token failed, logging out...");
        dispatch(performLogout());
      }
    } else {
      console.log("No token found, user is not logged in.");
      dispatch(performLogout());
    }

    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log("Setting user data from localStorage:", user);
        dispatch(setUsername({ username: user.username }));
        dispatch(setEmail({ email: user.email }));
        dispatch(setAvatarImageUrl({ avatarImageUrl: user.avatarImageUrl }));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  };
export const performLogout = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  dispatch(setIsLogout());
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials: { username: string; password: string }, { dispatch }) => {
    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return errorData;
      }

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.token);
        dispatch(setUsername({ username: data.user.username }));

        dispatch(setEmail({ email: data.user.email }));
        dispatch(setToken({ accessToken: data.token }));
        dispatch(
          setAvatarImageUrl({ avatarImageUrl: data.user.avatarImageUrl })
        );
        dispatch(setIsLoggedIn());

        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));
        return data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    credentials: {
      username: string;
      password: string;
      confirmPassword: string;
      email: string;
    },
    { dispatch }
  ) => {
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return errorData;
      }

      const data = await response.json();
      console.log(data);
      dispatch(setUsername({ username: data.user.username }));

      dispatch(setEmail({ email: data.user.email }));
      dispatch(setToken({ accessToken: data.token }));
      dispatch(setIsLoggedIn());

      localStorage.setItem("token", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (
    {
      credentials,
      authToken,
    }: { credentials: UpdateProfileData; authToken: string },
    { dispatch, rejectWithValue }
  ) => {
    console.log(credentials);
    try {
      const response = await fetch("http://localhost:3000/auth/editprofile", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const updatedUser: UpdateProfileData = await response.json();

      if (updatedUser.username !== undefined) {
        dispatch(setUsername({ username: updatedUser.username }));
      }
      if (updatedUser.email !== undefined) {
        dispatch(setEmail({ email: updatedUser.email }));
      }

      return updatedUser;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateAvatarImage = createAsyncThunk(
  "auth/updateAvatarImage",
  async (
    { imageFile, authToken }: { imageFile: File; authToken: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("avatarImage", imageFile);

      const response = await fetch("http://localhost:3000/auth/updateavatar", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setAvatarImageUrl({ avatarImageUrl: data.avatarImageUrl }));
        return data;
      } else {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to update avatar image"
        );
      }
    } catch (error) {
      return rejectWithValue("Failed to update avatar image");
    }
  }
);

export const {
  setIsLoggedIn,
  setEmail,
  setUsername,
  setToken,
  setIsLogout,
  setAvatarImageUrl,
} = authSlice.actions;

export const authSliceReducer = authSlice.reducer;
