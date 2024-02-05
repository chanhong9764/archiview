import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

const ConfirmModal = ({ open, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogContent>
        <DialogContentText>정말 변경하시겠습니까?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm}>예</Button>
        <Button onClick={onCancel} color="primary">
          아니오
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
