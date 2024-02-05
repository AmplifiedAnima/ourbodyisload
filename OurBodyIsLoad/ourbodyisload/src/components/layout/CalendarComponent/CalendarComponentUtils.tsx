import { Box, Button, Tooltip, Typography } from "@mui/material";
import { UserChosenClassesInterface } from "../../../store/slices/CalendarAppSlice";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";

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
          <SelfImprovementIcon
            sx={{
              color: "black",
              marginBottom: "5px",
              "@media (max-width: 1024px)": {
                fontSize: "24px",
              },
              "@media (max-width: 768px)": {
                fontSize: "20px",
                marginBottom: "0px",
              },
              "@media (max-width: 280px)": {},
            }}
          />
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
              "@media (max-width: 1024px)": { display: "none" },
              "@media (max-width: 768px)": { display: "none" },
              "@media (max-width: 280px)": { display: "none" },
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

// CalendarUtils.tsx

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
