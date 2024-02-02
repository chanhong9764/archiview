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

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__;

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  isAdmin: true,
  accessToken: "",
};

// 리듀서
function authReducer(state = initialState, action) {
  switch (action.type) {
    //Login
    case "LOGIN":
      console.log(action);
      return { ...state, isLoggedIn: true, accessToken: action.accessToken };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, accessToken: "" };

    //Loading
    case "SET_LOADING":
      console.log("loading");
      return { ...state, isLoading: true };
    case "UNSET_LOADING":
      console.log("loading end");
      return { ...state, isLoading: false };

    //Admin
    case "ADMIN_LOGIN":
      return { ...state, isAdmin: true };
    case "ADMIN_LOGOUT":
      return { ...state, isAdmin: false };

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
            <Route path="/myinterview" element={<MYI_P_01 />}></Route>
            <Route path="/addquestion" element={<MYI_P_02 />}></Route>
            <Route path="/revise" element={<MYI_P_02_Modify />}></Route>
            <Route path="/mypage" element={<MYP_P_01 />}></Route>
            <Route path="/modify" element={<MYP_P_02 />}></Route>
            <Route path="/search" element={<SCH_P_01 />}></Route>
            <Route path="/admin" element={<ADM_P_01 />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
