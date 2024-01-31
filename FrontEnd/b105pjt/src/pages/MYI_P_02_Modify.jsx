import React from "react";
import "../assets/css/MYI_P_02.css";
import ModifyForm from "../components/MYI_P_02/modifyForm";
import MyNavbar from "../components/MYI_P_02/myNavbar";

const MYI_P_02 = () => {
  return (
    <div>
      <MyNavbar></MyNavbar>

      {/* insert form */}
      <div className="MYI-P-02-Content">
        <div className="Insert-form">
          <ModifyForm></ModifyForm>
        </div>
      </div>
    </div>
  );
};

export default MYI_P_02;
