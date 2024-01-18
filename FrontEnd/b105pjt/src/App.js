import React, { useState } from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import NavbarLogin from "./components/utils/navbarLogin";
import { Route, Routes } from "react-router-dom";
import HOM_P_01 from "./pages/HOM_P_01";
import CAL_P_01 from "./pages/CAL_P_01";
import Navbar from "./components/utils/navbar";
import MYI_P_01 from "./pages/MYI_P_01";

const initialState = {
  isLoggedIn: false,
};

// 리듀서
function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true };
    case "LOGOUT":
      return { ...state, isLoggedIn: false };
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
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HOM_P_01 />}></Route>
        <Route path="/cal" element={<CAL_P_01 />}></Route>
        <Route path="/myinterview" element={<MYI_P_01 />}></Route>
      </Routes>
    </Provider>
  );
}

// 로그인 상태에 따라 Navbar 또는 NavbarLogin 렌더링
function NavbarComponent() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return <div>{isLoggedIn ? <Navbar /> : <NavbarLogin />}</div>;
}

export default App;
