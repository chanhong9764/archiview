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

  //버튼 굵게
  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  return (
    <div>
      <AppBar
        style={{ background: "white" }}
        position="fixed"
        sx={{
          height: 40,
          minHeight: 40,
          marginTop: {
            xs: "56px", // 600px 이하에서 적용될 marginTop 값
            sm: "64px", // 600px 이상에서 적용될 marginTop 값
          },
        }}
      >
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
                  fontWeight: isCurrentPage("/addquestion") ? "bold" : "normal", // 현재 페이지인지 확인
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
                  fontWeight: isCurrentPage("/myinterview") ? "bold" : "normal", // 현재 페이지인지 확인
                }}
              >
                내 질문들
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Toolbar></Toolbar>
    </div>
  );
}
export default MyNavbar;
