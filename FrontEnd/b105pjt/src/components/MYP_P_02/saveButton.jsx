import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import ConfirmModal from "./confirmModal";

const SaveButton = ({ onSave }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleConfirm = () => {
    setModalOpen(false);
    onSave(); // 실제 저장 로직을 호출합니다.
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <Box
      sx={{
        margin: "20px auto",
        textAlign: "center",
        mt: 1.5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        sx={{
          width: "100%",
          maxWidth: "350px",
          height: "50px",
        }}
      >
        비밀번호 변경
      </Button>
      <ConfirmModal
        open={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default SaveButton;
