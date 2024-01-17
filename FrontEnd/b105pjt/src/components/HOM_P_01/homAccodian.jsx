import React from "react";
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function HomAccodian({ title, children }) {
  const handleButtonClick = () => {
    // 등록하기 버튼 클릭 시 실행될 동작 추가
    console.log("등록하기 버튼 클릭");
  };

  //여기서 부터 화면에 출력해줍니다.
  return (
    <MuiAccordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Typography sx={{ flexGrow: 1, marginLeft: 1 }}>{title}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
            sx={{
              backgroundColor: "#ff4081",
              "&:hover": {
                backgroundColor: "#ff4081",
              },
            }}
          >
            등록하기
          </Button>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component="div">{children}</Typography>
      </AccordionDetails>
    </MuiAccordion>
  );
}

export default HomAccodian;
