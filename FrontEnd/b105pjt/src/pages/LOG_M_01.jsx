import React, { useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // 닫기 아이콘
import LoginModal from "../components/LOG_M_01/loginModal";
import FindIDModal from "../components/LOG_M_01/findIDModal";
import FindPWModal from "../components/LOG_M_01/findPWModal";
import AssignUser from "../components/LOG_M_01/assignUser";
import ChangPWModal from "../components/LOG_M_01/changePWModal";
const LOG_M_01 = ({ close }) => {
  const [currentComponent, setCurrentComponent] = useState("Login");

  const switchComponent = (componentName) => {
    setCurrentComponent(componentName);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "Login":
        return <LoginModal close={close} onSwitch={switchComponent} />;
      case "FindID":
        return <FindIDModal onSwitch={switchComponent} />;
      case "FindPW":
        return <FindPWModal onSwitch={switchComponent} />;
      case "Assign":
        return <AssignUser onSwitch={switchComponent} />;
      case "ChangePW":
        return <ChangPWModal onSwitch={switchComponent} />;
      default:
        return null;
    }
  };
  return (
    <div style={{ position: 'relative' }}>
      {/* 닫기 버튼 */}
      <IconButton
        aria-label="close"
        onClick={close}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          color: 'gray',
        }}
      >
        <CloseIcon />
      </IconButton>
      {renderComponent()}
    </div>
  );
};

export default LOG_M_01;