import { Box, Button, Modal, Typography } from "@mui/material";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { ActivityCard } from "./ActivityCard";
import styled from "@emotion/styled";
import { useState } from "react";
import { ActivityModalScheduling } from "./ActivityModalScheduling";
import { preExistingClassesInterface } from "../../../store/slices/CalendarAppSlice";

interface ActivityModalProps {
  open: boolean;
  handleClose: () => void;
  preExistingClassesProps: preExistingClassesInterface[] | undefined;
}

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 25px;
  padding: 0px 20px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

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
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
          bgcolor: "background.paper",
          overflowY: "auto",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            margin: "10px",
            background:
              "linear-gradient(to right, white 42%, rgba(94, 0, 140, 1) 90%)",
            fontFamily: 'Helvetica, "Trebuchet MS", Verdana, sans-serif',
            fontWeight: "bold",
            textShadow: "2px 2px 8px rgba(94, 0, 140, 0.2)",
            letterSpacing: "10px",
            "@media (max-width: 768px)": {
              fontSize: "18px",
              letterSpacing: "5px",
            },
          }}
        >
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
