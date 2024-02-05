import React, { useState } from "react";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ConfirmModal from "./confirmModal";

const BtnGroupInsert = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState(""); // "edit" 또는 "delete"

  // 수정 확인 모달 열기
  const handleEdit = () => {
    setConfirmType("edit");
    setOpenConfirm(true);
  };

  // 삭제 확인 모달 열기
  const handleDelete = () => {
    setConfirmType("delete");
    setOpenConfirm(true);
  };

  // 모달의 "예" 버튼 클릭 처리
  const handleConfirm = () => {
    if (confirmType === "edit") {
      console.log("수정 로직 실행");
      // 수정 로직을 여기에 추가하세요.
    } else if (confirmType === "delete") {
      console.log("삭제 로직 실행");
      // 삭제 로직을 여기에 추가하세요.
    }
    setOpenConfirm(false); // 모달 닫기
  };

  return (
    <div className="Insert-btn-group">
      <Button
        variant="outlined"
        startIcon={<ModeEditIcon />}
        color="success"
        onClick={handleEdit}
      >
        수정
      </Button>
      <Button
        variant="contained"
        endIcon={<DeleteForeverIcon />}
        color="error"
        onClick={handleDelete}
      >
        삭제
      </Button>

      <ConfirmModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirm}
        title={confirmType === "edit" ? "알림" : "알림"}
      >
        {confirmType === "edit"
          ? "정말로 수정하시겠습니까?"
          : "정말로 삭제하시겠습니까?"}
      </ConfirmModal>
    </div>
  );
};

export default BtnGroupInsert;
