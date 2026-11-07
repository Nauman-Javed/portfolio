import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useTheme } from "../../theme";

const Experience = ({ title, company, location, status, duration }) => {
  const { subHeading, statusC, statusBackground } = useTheme();
  // Test
  return (
    <div>
      <Box display={"flex"} justifyContent={"space-between"} my={3}>
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: subHeading,
              letterSpacing: 2,
              mb: 2,
              cursor: "default",
            }}
          >
            {title}
          </Typography>
          <Box
            display={{
              xs: "block",
              md: "flex",
            }}
            gap={4}
          >
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                color: subHeading,
                cursor: "default",
              }}
            >
              <ApartmentIcon />
              {company}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                color: subHeading,
                cursor: "default",
              }}
            >
              <LocationOnIcon />
              {location}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            variant="body1"
            sx={{
              backgroundColor: statusBackground,
              color: statusC,
              padding: " 0 25px",
              borderRadius: "15px",
              width: "fit-content",
              marginBottom: 2,
              fontWeight: "bold",
              cursor: "default",
              fontSize: "14px",
            }}
          >
            {status}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: subHeading,
              cursor: "default",
            }}
          >
            {duration}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </div>
  );
};

export default Experience;
