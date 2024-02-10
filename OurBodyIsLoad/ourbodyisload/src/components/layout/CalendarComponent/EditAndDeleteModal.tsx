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
import { activityModalSchedulingDatePickerStyles } from "../ActivityCardComponent/ActivityModalSchedulingStyles";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/material";
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
          <Button onClick={handleClose} sx={{ ...ButtonStylingForApp }}>
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(activityId)}
            autoFocus
            color="error"
            sx={{ ...ButtonStylingForApp }}
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
  handleClosePreviousModal: () => void;
}

export const EditActivityModal: React.FC<EditActivityModalProps> = ({
  activityId,
  open,
  handleClose,
  handleClosePreviousModal,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [scheduleTime, setScheduleTime] = useState<Date | null>(null);

  const handleEdit = () => {
    dispatch(
      editUserChosenClass({
        id: activityId,
        updateUserChosenClassDto: {
          scheduleTime: scheduleTime!,
        },
      })
    );
    console.log(`editmodal`, scheduleTime);
    handleClose();
    handleClosePreviousModal();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-dialog-title"
    >
      <Box sx={{ top: "50", left: "50" }}>
        <DialogTitle id="edit-dialog-title">Reschedule Activity</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Scheduled Date"
              value={scheduleTime}
              onChange={(newValue) => setScheduleTime(newValue)}
              sx={{ ...activityModalSchedulingDatePickerStyles, margin: "5px" }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ ...ButtonStylingForApp }}>
            Cancel
          </Button>
          <Button
            onClick={handleEdit}
            sx={{ ...ButtonStylingForApp }}
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
