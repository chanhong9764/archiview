import React from "react";
import logo from "../../assets/img/instagram.jpg";

const Logo = () => {
  //여기서 부터 화면에 출력해줍니다.
  return (
    <div style={{ margin: 20 }}>
      <img width="300px" height="200px" src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;
