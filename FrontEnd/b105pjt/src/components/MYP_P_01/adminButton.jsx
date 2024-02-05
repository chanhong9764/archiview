import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import React, { useState } from "react";

const AdminButton = () => {
  const [isBlocked, setIsBlocked] = useState(true);

  const handleSwitchChange = (event) => {
    setIsBlocked(event.target.checked);
  };

  const [auth, setAuth] = useState("일반");

  const handleChange = (event) => {
    setAuth(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div>
        <FormControlLabel
          style={{ paddingLeft: "10px" }}
          control={<Switch checked={isBlocked} onChange={handleSwitchChange} />}
          label={isBlocked ? "Block" : "Unblock"} // 조건부 렌더링을 통한 라벨 변경
        />
      </div>
      <div style={{ width: "80px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">권한</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={auth}
            label="권한"
            onChange={handleChange}
          >
            <MenuItem value={"일반"}>일반</MenuItem>
            <MenuItem value={"멤버"}>멤버</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default AdminButton;
