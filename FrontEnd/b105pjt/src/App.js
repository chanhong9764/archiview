import React, { useState } from "react";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import HOM_P_01 from "./pages/HOM_P_01";
import MYI_P_02_Modify from "./pages/MYI_P_02_Modify";
import CAL_P_01 from "./pages/CAL_P_01";
import MYI_P_01 from "./pages/MYI_P_01";
import MYI_P_02 from "./pages/MYI_P_02";
import MYP_P_01 from "./pages/MYP_P_01";
import MYP_P_02 from "./pages/MYP_P_02";
import SCH_P_01 from "./pages/SCH_P_01";
import ADM_P_01 from "./pages/ADM_P_01";
import "./assets/css/App.css";
import Footer from "./components/utils/footer";
import Loading from "./components/utils/loading";
import AuthMiddleware from "./hoc/memberAuth";
import UserAuth from "./hoc/userAuth";
import AdminAuth from "./hoc/adminAuth";
import Navbar from "./components/utils/navbar";
import { Box, Modal } from "@mui/material";
import LOG_M_01 from "./pages/LOG_M_01";
import AlertModal from "./components/utils/alertModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: 700,
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: "10px",
};

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  role: "",
  userId: "",
  profile: "",
  accessToken: "",
  isModalOpen: false,
  isAlertOpen: false,
  alertMessage: "",
  selectedCompany: {
    id: -1,
    name: "",
  },
};

// 리듀서
export function authReducer(state = initialState, action) {
  switch (action.type) {
    //Login
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.accessToken,
        role: action.role,
        userId: action.userId,
        profile: action.profile,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        accessToken: "",
        profile: "",
        userId: "",
        role: "",
      };

    //Loading
    case "SET_LOADING":
      return { ...state, isLoading: true };
    case "UNSET_LOADING":
      return { ...state, isLoading: false };

    case "OPEN_MODAL":
      return { ...state, isModalOpen: true };
    case "CLOSE_MODAL":
      return { ...state, isModalOpen: false };

    case "OPEN_ALERT":
      return {
        ...state,
        isAlertOpen: true,
        alertMessage: action.payload.message,
      };
    case "CLOSE_ALERT":
      return { ...state, isAlertOpen: false };

    case "UPDATE_PROFILE":
      return { ...state, profile: action.profile };
    case "UPDATE_SELECTED_COMPANY":
      return { ...state, selectedCompany: action.selectedCompany };
    default:
      return state;
  }
}

// 애플리케이션의 루트 컴포넌트
function App() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.isModalOpen);

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  return (
    <>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Loading />
        {/* 로그인 모달 */}
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <LOG_M_01 close={closeModal}></LOG_M_01>
          </Box>
        </Modal>
        {/* 경고 모달 */}
        <AlertModal />

        <Navbar />
        <div className="App" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HOM_P_01 />}></Route>
            <Route path="/cal" element={<CAL_P_01 />}></Route>
            <Route
              path="/myinterview"
              element={
                <UserAuth>
                  <MYI_P_01 />
                </UserAuth>
              }
            ></Route>
            <Route path="/addquestion" element={<MYI_P_02 />}></Route>
            <Route
              path="/interview/detail"
              element={
                <AuthMiddleware>
                  <MYI_P_02 />
                </AuthMiddleware>
              }
            ></Route>
            <Route
              path="/revise"
              element={
                <UserAuth>
                  <MYI_P_02_Modify />
                </UserAuth>
              }
            ></Route>
            <Route
              path="/mypage"
              element={
                <UserAuth>
                  <MYP_P_01 />
                </UserAuth>
              }
            ></Route>
            <Route
              path="/modify"
              element={
                <UserAuth>
                  <MYP_P_02 />
                </UserAuth>
              }
            ></Route>
            <Route path="/search" element={<SCH_P_01 />}></Route>
            <Route
              path="/admin"
              element={
                <AdminAuth>
                  <ADM_P_01 />
                </AdminAuth>
              }
            ></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
