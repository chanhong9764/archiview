import React, { useState } from "react";
import { Box, Modal, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const PasswordCheckModal = ({ open, onClose, onPasswordVerified }) => {
  const [currentPassword,   setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // 여기에서 비밀번호 확인 로직을 구현합니다. 
    // 예를 들어, 올바른 비밀번호가 '1234'라고 가정했을 때:
    const correctPassword = "123";
    if (currentPassword === correctPassword) {
      onPasswordVerified();
      onClose();
    } else {
      setError("비밀번호가 틀렸습니다.");
    }
  };

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
    if (error) setError("");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          비밀번호 확인
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          label="현재 비밀번호"
          type="password"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          error={!!error}
          helperText={error}
          sx={{ mt: 2 }}
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          확인
        </Button>
      </Box>
    </Modal>
  );
};

export default PasswordCheckModal;

