import React from "react";
import "../assets/css/MYI_P_02.css";
import InsertForm from "../components/MYI_P_02/insertForm";
import BtnGroupModify from "../components/MYI_P_02/btnGroupModify";

const MYI_P_02 = () => {
  return (
    <div style={{ p: "20", marginTop: "20px" }}>
      {/* insert form */}
      <div>
        <InsertForm></InsertForm>
        <BtnGroupModify></BtnGroupModify>
      </div>
    </div>
  );
};

export default MYI_P_02;
