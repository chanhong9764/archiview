import React, { useState } from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import NavbarLogin from "./components/utils/navbarLogin";
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
import NavbarComponent from "./components/utils/navbarComponent";
import AuthMiddleware from "./hoc/memberAuth";
import UserAuth from "./hoc/userAuth";
import AdminAuth from "./hoc/adminAuth";

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__;

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  role: "",
  userId: "",
  accessToken: "",
};

// 리듀서
function authReducer(state = initialState, action) {
  switch (action.type) {
    //Login
    case "LOGIN":
      return { ...state, isLoggedIn: true, accessToken: action.accessToken, role: action.role, userId: action.userId };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, accessToken: "" };

    //Loading
    case "SET_LOADING":
      console.log("loading");
      return { ...state, isLoading: true };
    case "UNSET_LOADING":
      console.log("loading end");
      return { ...state, isLoading: false };

    default:
      return state;
  }
}

// 스토어 생성
const store = createStore(authReducer, devTools && devTools());

// 애플리케이션의 루트 컴포넌트
function App() {
  return (
    <Provider store={store}>
      <Loading />
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <NavbarComponent />
        <div className="App" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HOM_P_01 />}></Route>
            <Route path="/cal" element={<CAL_P_01 />}></Route>
            <Route path="/myinterview" element={<UserAuth><MYI_P_01 /></UserAuth>}></Route>
            <Route path="/addquestion" element={<MYI_P_02 />}></Route>
            <Route path="/interview/detail" element={<AuthMiddleware><MYI_P_02 /></AuthMiddleware>}></Route>
            <Route path="/revise" element={<UserAuth><MYI_P_02_Modify /></UserAuth>}></Route>
            <Route path="/mypage" element={<UserAuth><MYP_P_01 /></UserAuth>}></Route>
            <Route path="/modify" element={<UserAuth><MYP_P_02 /></UserAuth>}></Route>
            <Route path="/search" element={<SCH_P_01 />}></Route>
            <Route path="/admin" element={<AdminAuth><ADM_P_01 /></AdminAuth>}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
