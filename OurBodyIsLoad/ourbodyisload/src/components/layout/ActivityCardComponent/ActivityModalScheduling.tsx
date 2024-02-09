import {
  Modal,
  Box,
  Button,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { postUserActivitiesToBackend } from "../../../store/slices/CalendarAppSlice";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { activityModalSchedulingDatePickerStyles } from "./ActivityModalSchedulingStyles";

export const StyledModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #f7f2fa;
  border-radius: 8px;
  padding: 25px;
  .MuiButton-root {
    margin-top: 10px;
    background-color: #6a1b9a;
    color: white;
    &:hover {
      background-color: #7e57c2;
    }
  }

  .MuiTextField-root {
    width: 100%;
  }
`;

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

  const handleCommenceActivity = () => {
    const currentDate = new Date();
    if (selectedDate) {
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
    }
    onClose();
    onClosePreviousModal();
  };

  useEffect(() => {
    setSelectedDate(null);
    setIsDatePickerOpened(false);
  }, [onClose]);

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalBox
        sx={{
          "@media (max-width: 280px)": { width: "80%" },
        }}
      >
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1">{description}</Typography>

        <CardMedia
          image={imageUrl}
          sx={{
            width: "400px",
            height: "250px",
            "@media (max-width: 280px)": { width: "100%" },
          }}
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
  );
};
