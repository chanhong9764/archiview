import React from "react";
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function HomAccodian({ title, children }) {
  return (
    <MuiAccordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component="div">{children}</Typography>
      </AccordionDetails>
    </MuiAccordion>
  );
}

export default HomAccodian;
