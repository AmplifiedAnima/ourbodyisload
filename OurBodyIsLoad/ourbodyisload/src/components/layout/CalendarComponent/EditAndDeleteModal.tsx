import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteUserActivity,
  editUserChosenClass,
} from "../../../store/slices/CalendarAppSlice";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AppDispatch } from "../../../store/store";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs"; // Import Dayjs
import { activityModalSchedulingDatePickerStyles } from "../ActivityCardComponent/ActivityModalSchedulingStyles";
interface DeleteActivityModalProps {
  activityId: string;
  open: boolean;
  handleClose: () => void;
  handleClosePreviousModal: () => void;
}
export const DeleteActivityModal: React.FC<DeleteActivityModalProps> = ({
  activityId,
  open,
  handleClose,
  handleClosePreviousModal,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (activityId: string) => {
    dispatch(deleteUserActivity({ activityId }));
    handleClosePreviousModal();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this activity? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => handleDelete(activityId)}
            autoFocus
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

interface EditActivityModalProps {
  activityId: string;
  open: boolean;
  handleClose: () => void;
  initialScheduleTime: Date;
}

export const EditActivityModal: React.FC<EditActivityModalProps> = ({
  activityId,
  open,
  handleClose,
  initialScheduleTime,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [scheduleTime, setScheduleTime] = useState<Dayjs | null>(
    dayjs(initialScheduleTime)
  );

  const handleEdit = () => {
    console.log(activityId)
    dispatch(
      editUserChosenClass({
        id: activityId, // Confirm this is correctly sourced and not NaN
        updateUserChosenClassDto: {
          scheduleTime: scheduleTime!.toISOString(),
        },
      })
    );
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-dialog-title"
    >
      <DialogTitle id="edit-dialog-title">Reschedule Activity</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Scheduled Date"
            value={scheduleTime}
            onChange={(newValue) => setScheduleTime(newValue)}
            sx={activityModalSchedulingDatePickerStyles}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleEdit} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
