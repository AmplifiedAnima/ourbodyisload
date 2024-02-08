import { UserChosenClassesInterface } from "../../../interfaces/calendar.interface";
import { Box, Button, Modal, Typography } from "@mui/material";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { DeleteActivityModal, EditActivityModal } from "./EditAndDeleteModal";
import { useState } from "react";

interface ClassCommencingActivityModalProps {
  open: boolean;
  handleClose: () => void;
  userChosenClass: UserChosenClassesInterface | undefined;
}
export const ClassVideoModal: React.FC<ClassCommencingActivityModalProps> = ({
  open,
  handleClose,
  userChosenClass,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

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
    <>
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
          <Box sx={{ margin: "25px", align: "center" }}>
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                ...ButtonStylingForApp,
                "&:hover": {
                  background: "red",
                },
              }}
            >
              Close
            </Button>

            <Box
              sx={{
                display: "flex",
              }}
            >
              <Button
                sx={{
                  ...ButtonStylingForApp,
                  marginRight: "5px",
                  "&:hover": {
                    background: "green",
                    color: "white",
                  },
                }}
                onClick={() => setEditModalOpen(true)}
              >
                EDIT
              </Button>
              <Button
                sx={{
                  ...ButtonStylingForApp,
                  "&:hover": {
                    background: "red",
                    color: "white",
                  },
                }}
                onClick={() => setDeleteModalOpen(true)}
              >
                DELETE
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <DeleteActivityModal
        activityId={userChosenClass!._id}
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleClosePreviousModal={handleClose}
      />
      <EditActivityModal
        activityId={userChosenClass!._id}
        open={editModalOpen}
        handleClose={() => setEditModalOpen(false)}
        initialScheduleTime={new Date()}
      />
    </>
  );
};
