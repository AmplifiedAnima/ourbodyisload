import mobilityIcon from "../../../static/icons/mobilityIcon.png";
import omIcon from "../../../static/icons/OmIcon.png";
import carsIcon from "../../../static/icons/hipJointIcon.png";
import pailsAndRailsIcon from "../../../static/icons/kneeJointIcon.png";
import { Box, Button, Collapse, Typography } from "@mui/material";
import { ButtonStylingForApp } from "../../../globalStyles/ButtonStylingForApp";
import { useState } from "react";

const iconStyles = {
  width: 30,
  height: 30,

  "@media (max-width: 768px)": {
    width: 20,
    height: 20,
  },
  "@media (max-width: 280px)": {
    width: 14,
    height: 14,
  },
};

export const mobilityIconVariable = (
  <Box
    component="img"
    src={mobilityIcon}
    alt="Mobility Class Icon"
    sx={iconStyles}
  />
);

export const pailsAndRailsIconVariable = (
  <Box
    component="img"
    src={pailsAndRailsIcon}
    alt="pailsIcon"
    sx={iconStyles}
  />
);
export const yogaClassIconVariable = (
  <Box component="img" src={omIcon} alt="Yoga Class Icon" sx={iconStyles} />
);
export const carsIconVariable = (
  <Box component="img" src={carsIcon} alt="Cars Icon" sx={iconStyles} />
);

export const LegendComponent = ({ open }: { open: boolean }) => {
  const legendStyles = {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: "8px",
    gap: "8px",
    backgroundColor: "#f7f7f7",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    margin: "16px 0",
    "@media (max-width: 768px)": {
      flexDirection: "column",
    },
    "@media (max-width: 280px)": {
      margin: "10px 0",
      flexDirection: "column",
      width: "auto",
    },
  };

  const legendItemStyles = {
    display: "flex",
    alignItems: "center",
    marginRight: "8px",
    gap: "12px",
    "@media (max-width: 280px)": {
      gap: "4px",
    },
  };

  return (
    <>
      <Collapse in={open}>
        <Box sx={legendStyles}>
          <Box sx={legendItemStyles}>
            {mobilityIconVariable}
            <Typography sx={{ paddingTop: "2px" }}>Mobility class</Typography>
          </Box>
          <Box sx={legendItemStyles}>
            {yogaClassIconVariable}
            <Typography sx={{ paddingTop: "2px" }}>Yoga class</Typography>
          </Box>
          <Box sx={legendItemStyles}>
            {carsIconVariable}
            <Typography sx={{ paddingTop: "2px" }}>CARS class</Typography>
          </Box>
          <Box sx={legendItemStyles}>
            {pailsAndRailsIconVariable}
            <Typography sx={{ paddingTop: "2px" }}>
              PAILS & RAILS class
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </>
  );
};
