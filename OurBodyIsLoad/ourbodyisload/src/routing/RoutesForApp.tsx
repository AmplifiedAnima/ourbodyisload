import { Route, Routes } from "react-router-dom";
import { MainApplicationOBIL } from "../pagesView/MainApplicationCalendar/MainApplicationOBIL";
import { ProfilePage } from "../pagesView/ProfilePage/ProfilePage";
import { ExerciseIdContainer } from "../components/layout/Exercises/ExerciseId/ExerciseIdContainer";
import { AboutCreator } from "../pagesView/CreatorView/AboutCreator";
import { ExercisesLibraryPage } from "../pagesView/ExercisesLibraryView/ExercisesLibraryView";
import { BlogPostsView } from "../pagesView/BlogPostsPage/BlogPostsView";
import { RegistrationPage } from "../pagesView/RegistrationPage/RegistrationPage";
import { EditProfilePage } from "../pagesView/EditProfileView/EditProfilePage";
import { PasswordRecoveryPage } from "../pagesView/PasswordRecoveryView/PasswordRecoveryPage";
import { ChangePasswordPage } from "../pagesView/ChangePasswordView/ChangePasswordPage";

export const RoutesForApp = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainApplicationOBIL />
            </>
          }
        />
        <Route
          path="/exercises/:id"
          element={
            <>
              <ExerciseIdContainer />
            </>
          }
        />

        <Route
          path="/exercise-library"
          element={
            <>
              <ExercisesLibraryPage />
            </>
          }
        />
        <Route
          path="/blog-post"
          element={
            <>
              <BlogPostsView />
            </>
          }
        />
        <Route
          path="/registration-page"
          element={
            <>
              <RegistrationPage />
            </>
          }
        />

        <Route
          path="/password-recovery"
          element={
            <>
              <PasswordRecoveryPage />
            </>
          }
        />
        <Route
          path="/change-password/:token"
          element={
            <>
              <ChangePasswordPage />
            </>
          }
        />
        <Route
          path="/edit-profile-page"
          element={
            <>
              <EditProfilePage />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <ProfilePage />
            </>
          }
        />
        <Route
          path="/about-creator"
          element={
            <>
              <AboutCreator />
            </>
          }
        />
      </Routes>
    </>
  );
};
