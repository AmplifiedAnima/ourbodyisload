import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

import { StyleWrapper } from "./CalendarStylings";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import {
  AddActivityButton,
  AddTrainingPlanButton,
} from "../ActivityCardComponent/AddActivityButton";
import { ActivityModal } from "../ActivityCardComponent/ActivityModal";
import {
  CalendarAppState,
  preExistingClassesInterface,
  UserChosenClassesInterface,
} from "../../../interfaces/calendar.interface";
import {
  fetchUserChosenClasses,
  fetchPreExistingClasses,
  clearError,
} from "../../../store/slices/CalendarAppSlice";
import { AuthState } from "../../../interfaces/auth.interface";
import { ClassVideoModal } from "./ClassVideoModal";
import { LoginToAccessThisPartComponent } from "../LoginToAccessThisPartComponent/LoginToAccessThisPartComponent";
import { TrainingPlanModal } from "../ActivityCardComponent/TrainingPlanModal";
import { eventsProp, renderEventInsides } from "./CalendarComponentUtils";
import { LegendComponent } from "./CalendarComponentIconsAndLegend";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import ErrorHandlerDisplayComponent from "../ErrorAndNotificationHandlers/ErrorHandlerDisplayComponent";

const CalendarComponent: React.FC = () => {
  const preExistingClasses = useSelector<
    RootState,
    preExistingClassesInterface[]
  >((state) => state.calendarApp.classes);

  const userChosenClasses = useSelector<
    RootState,
    UserChosenClassesInterface[]
  >((state) => state.calendarApp.userChosenClasses);

  const authState = useSelector<RootState, AuthState>((state) => state.auth);

  const calendarState: CalendarAppState = useSelector<
    RootState,
    CalendarAppState
  >((state) => state.calendarApp);

  const dispatch = useDispatch<AppDispatch>();

  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showAddTrainingPlanModal, setshowAddTrainingPlanModal] =
    useState(false);
  const [showVideoClassModal, setShowVideoClassModal] = useState(false);

  const [openLegend, setOpenLegend] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [isCalendarView, setIsCalendarView] = useState(true);
  const [isListView, setIsListView] = useState(false);

  const [selectedClass, setSelectedClass] =
    useState<UserChosenClassesInterface>();

  useEffect(() => {
    if (authState.isLoggedIn) {
      dispatch(fetchUserChosenClasses());
      console.log(calendarState);
      console.log(`auth`, authState);
    }
  }, [authState.isLoggedIn, !showAddActivityModal, !showVideoClassModal]);

  useEffect(() => {
    if (authState.isLoggedIn) {
      dispatch(fetchPreExistingClasses());
    }
  }, [authState.isLoggedIn]);

  useEffect(() => {
    if (calendarState.error) {
      setOpenError(true);
    } else {
      setOpenError(false);
    }
  }, [calendarState.error]);

  const handleCloseError = () => {
    setOpenError(false);
    dispatch(clearError());
  };
  const handleViewDidMount = (viewInfo: { view: { type: string } }) => {
    if (viewInfo.view.type.includes("list")) {
      setIsCalendarView(false);
      setIsListView(true);
    } else {
      setIsCalendarView(true);
      setIsListView(false);
    }
    console.log(viewInfo);
  };

  const eventsWithClasses = userChosenClasses?.map((userChosenClass) => ({
    title: userChosenClass.preExistingClassName,
    start: new Date(userChosenClass.scheduleTime),
    end: new Date(userChosenClass.scheduleTime),
    content: userChosenClass.preExistingClassName,
    timeOfTheClass: userChosenClass.scheduleTime,
    classId: userChosenClass._id,
  }));

  const eventContentRenderer = (eventInfo: eventsProp) =>
    renderEventInsides({
      eventInfo,
      isListView,
      isCalendarView,
      setSelectedClass,
      setShowVideoClassModal,
      userChosenClasses,
    });

  const handleDayClick = () => {
    console.log();
  };
  const toggleLegend = () => {
    setOpenLegend(!openLegend);
  };

  return (
    <>
      {authState.isLoggedIn ? (
        <Box sx={{ padding: "20px", background: "white", margin: "0px 15px" }}>
          {authState.isLoggedIn && (
            <>
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <AddActivityButton
                  OpenModal={() => setShowAddActivityModal(true)}
                />
                <AddTrainingPlanButton
                  OpenModal={() => setshowAddTrainingPlanModal(true)}
                />
              </Box>
              <LegendComponent open={openLegend} />
            </>
          )}
          <Button sx={ButtonStylingForApp} onClick={toggleLegend}>
            LEGEND
          </Button>
          {calendarState.error && (
            <ErrorHandlerDisplayComponent
              open={openError}
              handleClose={handleCloseError}
              error={calendarState.error}
            />
          )}
          {showAddActivityModal && (
            <ActivityModal
              open={showAddActivityModal}
              handleClose={() => setShowAddActivityModal(false)}
              preExistingClassesProps={preExistingClasses}
            />
          )}
          {showAddTrainingPlanModal && (
            <TrainingPlanModal
              open={showAddTrainingPlanModal}
              handleClose={() => setshowAddTrainingPlanModal(false)}
              trainingPlan={""}
            />
          )}
          <StyleWrapper>
            {showVideoClassModal && (
              <ClassVideoModal
                open={showVideoClassModal}
                handleClose={() => setShowVideoClassModal(false)}
                userChosenClass={selectedClass}
              />
            )}

            <FullCalendar
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              initialView={"dayGridMonth"}
              headerToolbar={{
                start: "dayGridMonth,listMonth",
                center: "title",
                end: "today prev,next",
              }}
              events={eventsWithClasses}
              eventContent={eventContentRenderer}
              dateClick={handleDayClick}
              viewDidMount={handleViewDidMount}
              slotEventOverlap={false}
            />
          </StyleWrapper>
        </Box>
      ) : (
        <LoginToAccessThisPartComponent />
      )}
    </>
  );
};
export default CalendarComponent;
