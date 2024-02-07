import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminButton = ({ blocked, role, onUpdate }) => {
  // 초기 상태를 props로부터 설정
  const [userRole, setUserRole] = useState(role);
  const navigate = useNavigate();

  useEffect(() => {
    setUserRole(role);
  }, [blocked, role]);

  const handleRoleChange = (event) => {
    const newRole = event.target.value;
    setUserRole(newRole);
    // 상태 변경을 부모 컴포넌트에 전달
    onUpdate({ role: newRole });
  };

  // 목록으로 다시
  const handleRedirect = () => {
    navigate("/admin", { replace: true });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Button variant="outlined" color="info" onClick={handleRedirect}>
        목록으로
      </Button>
      <FormControl fullWidth style={{ marginLeft: "10px", width: "100px" }}>
        <InputLabel id="role-select-label">권한</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={userRole}
          label="권한"
          onChange={handleRoleChange}
        >
          <MenuItem value="ROLE_USER">일반</MenuItem>
          <MenuItem value="ROLE_MEMBER">멤버</MenuItem>
          <MenuItem value="ROLE_BLOCK">차단</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default AdminButton;
