import { Modal, Button, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { postUserActivitiesToBackend } from "../../../store/slices/CalendarAppSlice";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  StyledModalBox,
  activityModalSchedulingDatePickerStyles,
} from "./ActivityModalAndSchedulingStyles";
import { NotificationHandlerDisplayComponent } from "../ErrorAndNotificationHandlers/NotificationHandlerDisplayComponent";

interface ScheduleActivityModalProps {
  open: boolean;
  onClose: () => void;
  onClosePreviousModal: () => void;
  selectedActivityId: string;
  imageUrl: string;
  title: string;
  description: string;
}

export const ActivityModalScheduling: React.FC<ScheduleActivityModalProps> = ({
  open,
  onClose,
  onClosePreviousModal,
  selectedActivityId,
  imageUrl,
  title,
  description,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerOpened, setIsDatePickerOpened] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [notification, setNotification] = useState(true);

  const handleCommenceActivity = () => {
    const currentDate = new Date();

    if (selectedDate) {
      console.log(`modal schedule selected date`, selectedDate);
      dispatch(
        postUserActivitiesToBackend({
          activityId: selectedActivityId,
          scheduleTime: selectedDate,
        })
      );
    } else {
      dispatch(
        postUserActivitiesToBackend({
          activityId: selectedActivityId,
          scheduleTime: currentDate,
        })
      );
      console.log(`modal schedule current date`, currentDate);
    }

    onClose();
    onClosePreviousModal();
  };

  useEffect(() => {
    setSelectedDate(null);
    setIsDatePickerOpened(false);
  }, [onClose]);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{
          top: 0,
          bottom: 20,
          "@media (max-width: 768px)": { top: 50 },
        }}
      >
        <StyledModalBox
          sx={{
            "@media (max-width: 768px)": { width: "60%" },
            "@media (max-width: 280px)": { width: "80%", padding: "15px" },
          }}
        >
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body1">{description}</Typography>

          <CardMedia
            image={imageUrl}
            sx={{
              width: "400px",
              height: "250px",
              "@media (max-width: 768px)": { width: "100%", height: "200px" },
              "@media (max-width: 280px)": { width: "100%" },
            }}
          />
          <NotificationHandlerDisplayComponent
            open={notification}
            handleClose={() => setNotification(false)}
            notification="please schedule between 04:00 and 23:00"
          />
          {!isDatePickerOpened && (
            <Button fullWidth onClick={() => setIsDatePickerOpened(true)}>
              Choose specific time
            </Button>
          )}
          {isDatePickerOpened && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Choose the date"
                value={selectedDate}
                onChange={(selectedDate: Date | null) =>
                  setSelectedDate(selectedDate)
                }
                sx={activityModalSchedulingDatePickerStyles}
              />
            </LocalizationProvider>
          )}
          <Button onClick={handleCommenceActivity} fullWidth>
            Schedule
          </Button>
          <Button onClick={onClose} fullWidth>
            Close
          </Button>
        </StyledModalBox>
      </Modal>
    </>
  );
};
