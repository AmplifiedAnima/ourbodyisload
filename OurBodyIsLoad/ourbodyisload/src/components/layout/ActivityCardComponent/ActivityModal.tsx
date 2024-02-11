import { Box, Button, Modal, Typography } from "@mui/material";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { ActivityCard } from "./ActivityCard";
import { useState } from "react";
import { ActivityModalScheduling } from "./ActivityModalScheduling";
import { preExistingClassesInterface } from "../../../interfaces/calendar.interface";
import {
  GridContainer,
  TypographyStylingInModal,
  boxModalStyles,
} from "./ActivityModalAndSchedulingStyles";

interface ActivityModalProps {
  open: boolean;
  handleClose: () => void;
  preExistingClassesProps: preExistingClassesInterface[] | undefined;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  open,
  handleClose,
  preExistingClassesProps,
}) => {
  const [isSchedulingModalOpen, setSchedulingModalOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<string>("");
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedDescription, setSelectedDecsription] = useState<string>("");
  const [selectedActivityThumbnail, setSelectedActivityThumbnail] =
    useState<string>("");

  const handleSelectActivity = (activityId: string) => {
    const selectedActivity = preExistingClassesProps?.find(
      (activity) => activity.id === activityId
    );
    if (selectedActivity) {
      setSelectedActivityId(activityId);
      setSelectedActivityThumbnail(
        getYouTubeThumbnail(selectedActivity.videoUrl)
      );
      setSelectedName(selectedActivity.name);
      setSelectedDecsription(selectedActivity.description);
      setSchedulingModalOpen(true);
    }
  };

  const getYouTubeThumbnail = (
    videoUrl: string,
    quality = "maxresdefault"
  ): string => {
    const videoId = new URLSearchParams(new URL(videoUrl).search).get("v");
    if (!videoId) return "";
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxModalStyles}>
        <Typography variant="h5" sx={TypographyStylingInModal}>
          SCHEDULE ACTIVITY
        </Typography>
        <GridContainer>
          {preExistingClassesProps?.map((activity) => (
            <ActivityCard
              key={`activity_${activity.id}`}
              title={activity.name}
              imageUrl={getYouTubeThumbnail(activity.videoUrl)}
              onSelect={() => handleSelectActivity(activity.id)}
            />
          ))}
          <ActivityModalScheduling
            key={selectedActivityId}
            open={isSchedulingModalOpen}
            onClose={() => setSchedulingModalOpen(false)}
            selectedActivityId={selectedActivityId}
            onClosePreviousModal={handleClose}
            imageUrl={selectedActivityThumbnail}
            title={selectedName}
            description={selectedDescription}
          />
        </GridContainer>
        <Button
          onClick={handleClose}
          sx={{
            ...ButtonStylingForApp,
            margin: "20px",
            "&:hover": {
              background: "red",
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};
