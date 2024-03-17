import React from "react";
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordion = ({ title, children }) => {
  return (
    <MuiAccordion
      sx={{
        borderRadius: "10px",
        "&:before": { display: "none" },
        "&.Mui-expanded": { margin: "auto" },
        "&:not(:last-child)": { borderBottom: 0 },
        "&:first-of-type": {
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        },
        "&:last-of-type": {
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        },
        "&.MuiPaper-root": {
          marginBottom: "10px",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ borderRadius: "10px" }}
      >
        <Typography component="div">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ borderRadius: "10px" }}>
        <Typography component="div">{children}</Typography>
      </AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
