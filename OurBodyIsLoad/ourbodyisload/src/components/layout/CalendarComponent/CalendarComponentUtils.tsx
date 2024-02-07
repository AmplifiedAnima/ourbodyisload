import { Box, Button, Collapse, Tooltip, Typography } from "@mui/material";
import { UserChosenClassesInterface } from "../../../store/slices/CalendarAppSlice";
import mobilityIcon from "../../../static/icons/mobilityIcon.png";
import omIcon from "../../../static/icons/OmIcon.png";
import carsIcon from "../../../static/icons/hipJointIcon.png";
import pailsAndRailsIcon from "../../../static/icons/kneeJointIcon.png";
import { useState } from "react";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";

const iconStyles = {
  width: 30,
  height: 30,
  marginRight: "8px",
  "@media (max-width: 768px)": {
    width: 20,
    height: 20,
  },
  "@media (max-width: 280px)": {
    width: 8,
    height: 8,
  },
};
const mobilityIconVariable = (
  <Box
    component="img"
    src={mobilityIcon}
    alt="Mobility Class Icon"
    sx={iconStyles}
  />
);

const pailsAndRailsIconVariable = (
  <Box
    component="img"
    src={pailsAndRailsIcon}
    alt="pailsIcon"
    sx={iconStyles}
  />
);
const yogaClassIconVariable = (
  <Box component="img" src={omIcon} alt="Yoga Class Icon" sx={iconStyles} />
);
const carsIconVariable = (
  <Box component="img" src={carsIcon} alt="Cars Icon" sx={iconStyles} />
);

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

export const LegendComponent = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const legendStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "16px",
    gap: "8px",
    backgroundColor: "#f7f7f7",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    margin: "16px 0",
  };

  const legendItemStyles = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  return (
    <>
      <Button
        onClick={handleToggle}
        variant="contained"
        sx={ButtonStylingForApp}
      >
        Legend
      </Button>
      <Collapse in={open}>
        <Box sx={legendStyles}>
          <Typography variant="h6" component="div">
            Legend
          </Typography>
          <Box sx={legendItemStyles}>
            {mobilityIconVariable}
            <Typography>Mobility</Typography>
          </Box>
          <Box sx={legendItemStyles}>
            {yogaClassIconVariable}
            <Typography>Yoga </Typography>
          </Box>
          <Box sx={legendItemStyles}>
            {carsIconVariable}
            <Typography>CARS </Typography>
          </Box>
          <Box sx={legendItemStyles}>
            {pailsAndRailsIconVariable}
            <Typography>PAILS & RAILS </Typography>
          </Box>
        </Box>
      </Collapse>
    </>
  );
};
