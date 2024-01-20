import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";

const pages = ["질문 등록", "내 질문"];

function MyNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 내 질문 클릭시
  const handleMyInterview = () => {
    navigate("/myinterview", { replace: true });
  };

  // 질문등록 클릭시
  const handleAddQuestion = () => {
    navigate("/addquestion", { replace: true });
  };

  return (
    <AppBar style={{ background: "white" }} position="static" sx={{ height: 40, minHeight: 40 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 40, minHeight: 40 }}>
          {/* 큰 사이즈 메뉴 */}
          <Box sx={{ display: "flex", height: "100%" }}>
            <Button
              onClick={handleAddQuestion}
              sx={{
                color: "#222222",
                display: "block",
                height: 40,
                minHeight: 40,
                padding: "0 8px",
              }}
            >
              질문 등록
            </Button>
            <Button
              onClick={handleMyInterview}
              sx={{
                color: "#222222",
                display: "block",
                height: 40,
                minHeight: 40,
                padding: "0 8px",
              }}
            >
              내 질문들
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MyNavbar;
