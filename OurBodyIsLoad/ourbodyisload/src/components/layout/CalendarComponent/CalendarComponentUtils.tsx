import { Box, Button, Tooltip, Typography } from "@mui/material";
import { UserChosenClassesInterface } from "../../../interfaces/Calendar.interface";
import {
  carsIconVariable,
  mobilityIconVariable,
  pailsAndRailsIconVariable,
  yogaClassIconVariable,
} from "./CalendarComponentIconsAndLegend";

export interface eventsProp {
  event: {
    title: string;
    start: Date;
    extendedProps: {
      allDay?: boolean;
      content?: string;
      classId: string;
      timeOfTheClass: string;
    };
  };
}

interface RenderEventInsidesProps {
  eventInfo: eventsProp;
  isListView: boolean;
  isCalendarView: boolean;
  setSelectedClass: Function;
  setShowVideoClassModal: Function;
  userChosenClasses: UserChosenClassesInterface[];
}

export const renderEventInsides = ({
  eventInfo,
  isListView,
  isCalendarView,
  setSelectedClass,
  setShowVideoClassModal,
  userChosenClasses,
}: RenderEventInsidesProps) => {
  const isMobilityClass = eventInfo.event.title
    .toLowerCase()
    .includes("mobility");

  const isYogaClass = eventInfo.event.title.toLowerCase().includes("yoga");

  const isCarsClass = eventInfo.event.title.toLowerCase().includes("cars");

  const isPailsRailsClass =
    eventInfo.event.title.toLowerCase().includes("pails") ||
    eventInfo.event.title.toLowerCase().includes("rails");

  return (
    <Tooltip
      title={isListView ? "" : eventInfo.event.extendedProps.content}
      enterDelay={800}
    >
      <Box>
        <Button
          onClick={() => {
            const classId = eventInfo.event.extendedProps.classId;
            const userChosenClass = userChosenClasses.find(
              (classItem) => classItem._id === classId
            );
            console.log(userChosenClass);
            if (userChosenClass) {
              setSelectedClass(userChosenClass);
              setShowVideoClassModal(true);
            }
          }}
          sx={{
            padding: "3px 10px",
            "&:hover": {
              background: "transparent",
            },
          }}
        >
          {isMobilityClass && mobilityIconVariable}
          {isCarsClass && carsIconVariable}
          {isPailsRailsClass && pailsAndRailsIconVariable}
          {isYogaClass && yogaClassIconVariable}
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "10px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "auto",
              color: "black",
              padding: "3px 10px",
              "@media (max-width: 1024px)": {
                display: isCalendarView ? "none" : "",
              },
              "@media (max-width: 768px)": {
                display: isCalendarView ? "none" : "",
              },
              "@media (max-width: 280px)": {
                display: isCalendarView ? "none" : "",
              },
              margin: "0px",
            }}
          >
            {isCalendarView
              ? new Date(
                  eventInfo.event.extendedProps.timeOfTheClass
                ).toLocaleTimeString()
              : eventInfo.event.extendedProps.content}
          </Typography>
        </Button>
      </Box>
    </Tooltip>
  );
};

export const handleViewDidMount = (
  viewInfo: { view: { type: string } },
  setIsCalendarView: React.Dispatch<React.SetStateAction<boolean>>,
  setIsListView: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (viewInfo.view.type.includes("list")) {
    setIsCalendarView(false);
    setIsListView(true);
  } else {
    setIsCalendarView(true);
    setIsListView(false);
  }
  console.log(viewInfo);
};
