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
import { logout } from "../../api/userAPI";
import Logo from "../../assets/img/symbolLogo_Slogun-removebg-preview.png";
import { setCookie, getCookie, removeCookie } from "../../utils/cookie";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { userDetail } from "../../api/mypageAPI"
import { Image } from "@mui/icons-material";

function Navbar() {
  const isAdmin = useSelector((state) => state.isAdmin);
  const accessToken = useSelector((state) => state.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // 현재 경로 정보를 얻어오기 위해 useLocation 사용

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [profileUrl, setProfileUrl] = React.useState(null);
  useEffect(() => {
    userDetail(
      {
        headers: {
          Authorization: accessToken,
        },
      },
      (resp) => {
        setProfileUrl("https://i10b105.p.####.io/api/files/profile/" + resp.data.data.id);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

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
    logout(
      {
        headers: {
          Authorization: accessToken,
        },
      },
      (resp) => {
        console.log(resp);
      },
      (error) => {
        console.log(error);
      }
    );
    dispatch({ type: "LOGOUT", accessToken: "" });
    removeCookie("refreshToken");
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

  // 상세 검색 클릭시
  const handleSearch = () => {
    navigate("/search", { replace: true });
  };

  // 면접 관리 클릭시
  const handleMyInterview = () => {
    navigate("/myinterview", { replace: true });
  };

  // 마이페이지 클릭시
  const handleMypage = () => {
    navigate("/mypage", { replace: true });
  };

  const handleAdminpage = () => {
    navigate("/admin", { replace: true });
  };

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  return (
    <div>
      <AppBar style={{ background: "white" }} position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* 큰 사이즈 logo */}

            <Box
              onClick={handleRefresh}
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                cursor: "pointer",
              }}
            >
              <img src={Logo} alt="Logo" style={{ height: "40px" }} />
            </Box>

            {/* 작은 사이즈 logo */}
            <Box
              onClick={handleRefresh}
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                cursor: "pointer",
              }}
            >
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
                    채용 공고
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography onClick={handleSearch} textAlign="center">
                    상세 검색
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
              <Button
                onClick={handleCalendar}
                sx={{
                  my: 2,
                  color: "#222222",
                  display: "block",
                  fontWeight: isCurrentPage("/cal") ? "bold" : "normal",
                }}
              >
                취업 캘린더
              </Button>
              <Button
                onClick={handleSearch}
                sx={{
                  my: 2,
                  color: "#222222",
                  display: "block",
                  fontWeight: isCurrentPage("/search") ? "bold" : "normal",
                }}
              >
                상세 검색
              </Button>
              <Button
                onClick={handleMyInterview}
                sx={{
                  my: 2,
                  color: "#222222",
                  display: "block",
                  fontWeight:
                    isCurrentPage("/myinterview") ||
                    isCurrentPage("/addquestion")
                      ? "bold"
                      : "normal",
                }}
              >
                면접 관리
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* 프로필 이미지 */}
                    <Avatar src={profileUrl} alt="Logo" style={{ height: "50px" }} />
                </Button>
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
                  <Typography onClick={handleMypage} textAlign="center">
                    마이페이지
                  </Typography>
                </MenuItem>
                {isAdmin && (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography onClick={handleAdminpage} textAlign="center">
                      관리페이지
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar></Toolbar>
    </div>
  );
}
export default Navbar;
