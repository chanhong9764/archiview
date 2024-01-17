import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const pages = ["캘린더"];
const settings = ["로그인"];

function NavbarLogin() {
  const handleClickCalendar = () => {
    alert("캘린더 클릭");
  };

  const handleClickLogin = () => {
    alert("로그인 클릭");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* 큰 사이즈 logo */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <img
              src="http://placehold.it/120X40"
              alt="Logo"
              style={{ height: "40px" }}
            />
          </Box>

          {/* 작은 사이즈 logo */}
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <img
              src="http://placehold.it/120X40"
              alt="Logo"
              style={{ height: "40px" }}
            />
          </Box>

          {/* 좌측 메뉴 */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleClickCalendar}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* 우측 메뉴 */}
          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
              {settings.map((setting) => (
                <Button
                  key={setting}
                  onClick={handleClickLogin}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {setting}
                </Button>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarLogin;
