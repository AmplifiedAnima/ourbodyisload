import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

import { StyleWrapper } from "./CalendarStylings";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useSelector } from "react-redux";

import {
  AddActivityButton,
  AddTrainingPlanButton,
} from "../ActivityCardComponent/AddActivityButton";
import { ActivityModal } from "../ActivityCardComponent/ActivityModal";
import {
  fetchPreExistingClasses,
  fetchUserChosenClasses,
  preExistingClassesInterface,
} from "../../../store/slices/CalendarAppSlice";
import { UserChosenClassesInterface } from "../../../store/slices/CalendarAppSlice";
import { AuthState } from "../../../store/slices/authSlice";
import { ClassVideoModal } from "./ClassVideoModal";
import { LoginToAccessThisPartComponent } from "../LoginToAccessThisPartComponent/LoginToAccessThisPartComponent";
import { TrainingPlanModal } from "../ActivityCardComponent/TrainingPlanModal";
import {
  LegendComponent,
  eventsProp,
  renderEventInsides,
} from "./CalendarComponentUtils";

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
  const dispatch = useDispatch<AppDispatch>();

  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showAddTrainingPlanModal, setshowAddTrainingPlanModal] =
    useState(false);
  const [showVideoClassModal, setShowVideoClassModal] = useState(false);
  const [selectedClass, setSelectedClass] =
    useState<UserChosenClassesInterface>();

  const [isCalendarView, setIsCalendarView] = useState(true);
  const [isListView, setIsListView] = useState(false);

  useEffect(() => {
    if (authState.isLoggedIn) {
      dispatch(fetchUserChosenClasses());
    }
  }, [authState.isLoggedIn, !showAddActivityModal]);

  useEffect(() => {
    if (authState.isLoggedIn) {
      dispatch(fetchPreExistingClasses());
    }
  }, [authState.isLoggedIn]);

  useEffect(() => {
    console.log(userChosenClasses);
  }, [userChosenClasses]);

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
                <LegendComponent />
              </Box>
            </>
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
