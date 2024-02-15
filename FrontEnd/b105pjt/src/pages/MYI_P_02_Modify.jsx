import React from "react";
import "../assets/css/MYI_P_02.css";
import ModifyForm from "../components/MYI_P_02/modifyForm";
import MyNavbar from "../components/MYI_P_02/myNavbar";
import { useLocation } from "react-router-dom";

const MYI_P_02 = () => {
  const location = useLocation();
  const { reply } = location.state || {};

  return (
    <div>
      <MyNavbar></MyNavbar>

      {/* insert form */}
      <div className="MYI-P-02-Content">
        <div className="Insert-form">
          <ModifyForm reply={reply}></ModifyForm>
        </div>
      </div>
    </div>
  );
};

export default MYI_P_02;
