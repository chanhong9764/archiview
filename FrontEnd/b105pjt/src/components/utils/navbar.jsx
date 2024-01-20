import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "../../assets/img/symbolLogo_Slogun-removebg-preview.png";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // 메뉴 여닫기
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // 메뉴 여닫기
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  // 메뉴 여닫기
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  // 메뉴 여닫기
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // 로그아웃 클릭시
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/", { replace: true });
  };

  // 로고 클릭시
  const handleRefresh = () => {
    navigate("/", { replace: true });
  };

  // 내 캘린더 클릭시
  const handleCalendar = () => {
    navigate("/cal", { replace: true });
  };

  // 내 인터뷰 클릭시
  const handleMyInterview = () => {
    navigate("/myinterview", { replace: true });
  };

  return (
    <AppBar style={{ background: "white" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* 큰 사이즈 logo */}

          <Box onClick={handleRefresh} sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <img src={Logo} alt="Logo" style={{ height: "40px" }} />
          </Box>

          {/* 작은 사이즈 logo */}
          <Box onClick={handleRefresh} sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <img src={Logo} alt="Logo" style={{ height: "40px" }} />
          </Box>

          {/* 작은 사이즈 메뉴 버튼 */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography onClick={handleCalendar} textAlign="center">
                  취업 캘린더
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography onClick={handleMyInterview} textAlign="center">
                  내 인터뷰
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* 큰 사이즈 메뉴 */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button onClick={handleCalendar} sx={{ my: 2, color: "#222222", display: "block" }}>
              취업 캘린더
            </Button>
            <Button onClick={handleMyInterview} sx={{ my: 2, color: "#222222", display: "block" }}>
              내 인터뷰
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* 프로필 이미지 */}
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={handleLogout} textAlign="center">
                  로그아웃
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">마이페이지</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
