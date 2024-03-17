import React from "react";
import MyNavbar from "../components/MYI_P_02/myNavbar";
import "../assets/css/MYI_P_02.css";
import InsertForm from "../components/MYI_P_02/insertForm";

const MYI_P_02 = () => {
  return (
    <div>
      <MyNavbar></MyNavbar>

      {/* insert form */}
      <div className="MYI-P-02-Content">
        <div className="Insert-form">
          <InsertForm></InsertForm>
        </div>
      </div>
    </div>
  );
};

export default MYI_P_02;
