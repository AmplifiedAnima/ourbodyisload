import React from "react";
import styled from "@emotion/styled";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";

export const StyledActivityCard = styled(Card)`
  width: 100%; // Fixed width for each card
  height: 100%;
  margin-bottom: 10px;

  background-color: #f7f2fa;
  .MuiCardMedia-root {
    height: 130px;
    margin: 15px; 
    justify-content:center;
    align-items: center;
    display: flex;
  }

  .MuiCardContent-root {
    color: #6a1b9a;
  }

  .MuiCardMedia-root {
  }

  &:hover {
    cursor: normal;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

interface ActivityCardProps {
  title: string;
  imageUrl: string;
  onSelect: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  imageUrl,
  onSelect,
}) => {
  return (
    <StyledActivityCard>
      <CardMedia image={imageUrl} title={title} />
      <CardContent>
        <Typography gutterBottom variant="body2">
          {title}
        </Typography>
        <Button
          onClick={onSelect}
          sx={{
            ...ButtonStylingForApp,
            width: "100%",
            "&:hover": {
              background: "green",
              color: "white",
            },
          }}
        >
          Select
        </Button>
      </CardContent>
    </StyledActivityCard>
  );
};
