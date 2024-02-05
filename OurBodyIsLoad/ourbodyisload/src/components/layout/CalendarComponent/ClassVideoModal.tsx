import { UserChosenClassesInterface } from "../../../store/slices/CalendarAppSlice";
import { Box, Button, Modal, Typography } from "@mui/material";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";

interface ClassCommencingActivityModalProps {
  open: boolean;
  handleClose: () => void;
  userChosenClass: UserChosenClassesInterface | undefined; // Allow undefine
}
export const ClassVideoModal: React.FC<ClassCommencingActivityModalProps> = ({
  open,
  handleClose,
  userChosenClass,
}) => {
  const convertToEmbedUrl = (youtubeUrl: string | undefined) => {
    if (typeof youtubeUrl === "string" && youtubeUrl.trim() !== "") {
      const regExp =
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?.+&v=)([^#\&\?]*).*/;
      const match = youtubeUrl.match(regExp);

      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
      }
    }
    return;
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
          width: "auto",
          height: "auto",
          bgcolor: "background.paper",
          overflowY: "auto",
          borderRadius: "8px",
          "@media (max-width: 768px)": {
            height: "auto",
            width: "400px",
          },
          "@media (max-width: 280px)": {
            height: "100%",
            width: "280px",
            borderRadius: "0px",
          },
        }}
      >
        <Box sx={{ margin: "25px",align: "center" ,}}>
          <Typography variant="h5" sx={{ marginBottom: "20px"}}>
            {" "}
            {userChosenClass?.preExistingClassName}
          </Typography>
          <iframe
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            width="560"
            height="315"
            src={convertToEmbedUrl(userChosenClass?.preExistingClassVideoUrl)}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />

          <Typography sx={{ marginTop: "10px" }}>
            Scheduled Date :{" "}
            {new Date(userChosenClass!.scheduleTime).toLocaleDateString()}
          </Typography>
          <Typography sx={{ marginTop: "10px" }}>
            Scheduled Time :{" "}
            {new Date(userChosenClass!.scheduleTime).toLocaleTimeString()}
          </Typography>
        </Box>
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
