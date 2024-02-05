// ConfirmModal.jsx
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트

const ConfirmModal = ({ open, onClose, title, children }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  // '예' 버튼 클릭 핸들러
  const handleYesClick = () => {
    navigate("/myinterview"); // /myinterview 경로로 이동
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleYesClick} color="primary" autoFocus>
          예
        </Button>
        <Button onClick={onClose} color="primary">
          아니오
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
