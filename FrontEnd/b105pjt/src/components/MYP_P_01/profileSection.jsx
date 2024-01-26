import React, { useState } from "react";
import {
  Paper,
  IconButton,
  Avatar,
  Modal,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProfileEditModal = ({
  open,
  onClose,
  imageUrl,
  onImageChange,
  introduce,
  onIntroduceChange,
}) => {
  const [newImageUrl, setNewImageUrl] = useState(imageUrl);
  const [newIntroduce, setNewIntroduce] = useState(introduce);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const newImageFile = event.target.files[0];
      setNewImageUrl(URL.createObjectURL(newImageFile));
      onImageChange(newImageFile);
    }
  };

  const handleIntroduceChange = (event) => {
    setNewIntroduce(event.target.value);
    onIntroduceChange(event.target.value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
          프로필 편집
        </Typography>
        <input
          accept="image/*"
          type="file"
          onChange={handleFileChange}
          style={{ display: "block", margin: "10px 0" }}
        />
        <Avatar
          src={newImageUrl}
          alt="New Profile"
          sx={{ width: 150, height: 150, borderRadius: "50%", mb: 2 }}
        />
        <TextField
          label="소개글"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          value={newIntroduce}
          onChange={handleIntroduceChange}
          sx={{ mt: 2, mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          sx={{ mt: 2 }}
        >
          업데이트
        </Button>
      </Box>
    </Modal>
  );
};

const ProfileSection = ({ children, imageUrl, introduce, setIntroduce }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
  const [currentIntroduce, setCurrentIntroduce] = useState(introduce);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleImageChange = (newImageFile) => {
    setCurrentImageUrl(URL.createObjectURL(newImageFile));
  };

  const handleIntroduceChange = (newIntroduce) => {
    setCurrentIntroduce(newIntroduce);
    setIntroduce(newIntroduce);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        margin: "20px auto",
        textAlign: "center",
        width: "40%",
        maxWidth: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Profile <hr />
      </Typography>

      <Box sx={{ position: "relative", mb: 2 }}>
        <Avatar
          src={currentImageUrl}
          alt="Profile"
          sx={{ width: 150, height: 150, borderRadius: "50%" }}
        />
        <IconButton
          color="primary"
          onClick={handleOpenModal}
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "grey.200",
            },
          }}
        >
          <EditIcon />
        </IconButton>
      </Box>
      {children}
      <ProfileEditModal
        open={openModal}
        onClose={handleCloseModal}
        imageUrl={currentImageUrl}
        onImageChange={handleImageChange}
        introduce={currentIntroduce}
        onIntroduceChange={handleIntroduceChange}
      />
    </Paper>
  );
};

export default ProfileSection;
