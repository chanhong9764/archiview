import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Modal } from "@mui/material";
import LOG_M_01 from "../../pages/LOG_M_01";

const pages = ["캘린더"];
const settings = ["로그인"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: 700,
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: "10px",
};

function NavbarLogin() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickCalendar = () => {
    alert("캘린더 클릭");
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
                  onClick={handleOpen}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {setting}
                </Button>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </Container>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <LOG_M_01></LOG_M_01>
          </Box>
        </Modal>
      </div>
    </AppBar>
  );
}
export default NavbarLogin;
