import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const pages = ["질문 등록", "내 질문"];

function MyNavbar() {
  return (
    <AppBar position="static" sx={{ height: 40, minHeight: 40 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 40, minHeight: 40 }}>
          {/* 큰 사이즈 메뉴 */}
          <Box sx={{ display: "flex", height: "100%" }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  color: "white",
                  display: "block",
                  height: 40,
                  minHeight: 40,
                  padding: "0 8px",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MyNavbar;
