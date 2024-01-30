import React, { useState } from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import NavbarLogin from "./components/utils/navbarLogin";
import { Route, Routes } from "react-router-dom";
import HOM_P_01 from "./pages/HOM_P_01";
import CAL_P_01 from "./pages/CAL_P_01";
import MYI_P_01 from "./pages/MYI_P_01";
import MYI_P_02 from "./pages/MYI_P_02";
import MYP_P_01 from "./pages/MYP_P_01";
import MYP_P_02 from "./pages/MYP_P_02";
import SCH_P_01 from "./pages/SCH_P_01";
import Navbar from "./components/utils/navbar";
import "./assets/css/App.css";
import { CircularProgress } from "@mui/material";
import Footer from "./components/utils/footer";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
};

// 리듀서
function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true };
    case "LOGOUT":
      return { ...state, isLoggedIn: false };
    case "SET_LOADING":
      return { ...state, isLoading: true };
    case "UNSET_LOADING":
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

// 스토어 생성
const store = createStore(authReducer);

// 애플리케이션의 루트 컴포넌트
function App() {
  return (
    <Provider store={store}>
      <LoadingComponent />
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <NavbarComponent />
        <div className="App" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HOM_P_01 />}></Route>
            <Route path="/cal" element={<CAL_P_01 />}></Route>
            <Route path="/myinterview" element={<MYI_P_01 />}></Route>
            <Route path="/addquestion" element={<MYI_P_02 />}></Route>
            <Route path="/mypage" element={<MYP_P_01 />}></Route>
            <Route path="/modify" element={<MYP_P_02 />}></Route>

            <Route path="/search" element={<SCH_P_01 />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

function LoadingComponent() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <div>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            zIndex: 2000,
          }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

// 로그인 상태에 따라 Navbar 또는 NavbarLogin 렌더링
function NavbarComponent() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return <div>{isLoggedIn ? <Navbar /> : <NavbarLogin />}</div>;
}

export default App;
