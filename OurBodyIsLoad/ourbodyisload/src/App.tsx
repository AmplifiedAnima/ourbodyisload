import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { RoutesForApp } from "./routing/RoutesForApp";
import { initializeIsLoggedInState } from "./store/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeIsLoggedInState());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <RoutesForApp />
    </BrowserRouter>
  );
}

export default App;
