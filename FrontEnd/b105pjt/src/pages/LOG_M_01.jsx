import React, { useState } from "react";
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

  return renderComponent();
};

export default LOG_M_01;
