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
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close"; // 닫기 아이콘을 위한 임포트
import ActionButton from "../../components/MYP_P_01/actionButton";
import { useSelector } from "react-redux";
import { userDetail, uploadProfileImage, updateUserDetail } from "../../api/mypageAPI";
import { useEffect } from "react";

const ProfileSection = () => {
  const [openModal, setOpenModal] = useState(false);

  const accessToken = useSelector((state) => state.accessToken);

  const [ id, setId ] = useState();
  const [ name, setName ] = useState();
  const [email, setEmail] = useState();
  
  const [currentProfileUrl, setCurrentProfileUrl] = useState();
  const [currentIntroduce, setCurrentIntroduce] = useState();
  const [newProfileUrl, setNewProfileUrl] = useState();
  const [introduce, setIntroduce] = useState();
  const [newIntroduce, setNewIntroduce] = useState(); 
  const [uploadedImage, setUploadedImage] = useState();

  useEffect(() => {
    userDetail(
      {
        headers: {
          Authorization: accessToken,
        },
      },
      (resp) => {
        setId(resp.data.data.id);
        setName(resp.data.data.name);
        setEmail(resp.data.data.email);
        setCurrentProfileUrl("https://i10b105.p.ssafy.io/api/files/profile/" + resp.data.data.id);
        setNewProfileUrl("https://i10b105.p.ssafy.io/api/files/profile/" + resp.data.data.id);
        setIntroduce(resp.data.data.introduce);
        setCurrentIntroduce(resp.data.data.introduce);
        setNewIntroduce(resp.data.data.introduce);
      },
      (error) => {
        console.log(error);
      }
    ); 
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleApply = () => {
    handleSave();
    setOpenModal(false);
  };

  const handleCancle = () => {
    setCurrentProfileUrl("https://i10b105.p.ssafy.io/api/files/profile/" + id);
    setCurrentIntroduce(introduce);
    setOpenModal(false);
  }

  const handleImageChange = (newImageFile) => {
    setCurrentProfileUrl(URL.createObjectURL(newImageFile));
    setUploadedImage(newImageFile);
  };

  const handleIntroduceChange = (newIntroduce) => {
    setCurrentIntroduce(newIntroduce);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("img", uploadedImage);
    uploadProfileImage(id, formData,
      (resp) => {
        console.log(resp);
      },
      (error) => {
        console.log(error);
      }
    );

    updateUserDetail(
      {
        headers: {
          Authorization: accessToken,
        }
      },
      {
        introduce: newIntroduce,
        profileUrl: newProfileUrl,
      },
      (resp) => {
        console.log("profileSection -> uploadUserDetail | 회원정보 변경 성공");
      },
      (error) => {
        console.log("profileSection -> uploadUserDetail | 회원정보 변경 실패");
      }
    );      
  };

  const handleDelete = () => {
    // 회원탈퇴 로직
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
          src={currentProfileUrl}
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
      <Box sx={{ textAlign: "center", width: "100%" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {name}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {email}
        </Typography>
        <Typography sx={{ mb: 3 }}>{currentIntroduce}</Typography>
        <Divider sx={{ width: "100%", my: 2 }} />
        <ActionButton onSave={handleSave} onDelete={handleDelete} />
      </Box>
      <ProfileEditModal
        open={openModal}
        handleApply={handleApply}
        handleCancle={handleCancle}

        newProfileUrl={currentProfileUrl}
        setNewProfileUrl={setNewProfileUrl}
        newIntroduce={currentIntroduce}
        setNewIntroduce={setNewIntroduce}

        onImageChange={handleImageChange}
        onIntroduceChange={handleIntroduceChange}
      />
    </Paper>
  );
};

const ProfileEditModal = ({
  open,
  handleApply,
  handleCancle,
  newProfileUrl,
  setNewProfileUrl,
  newIntroduce,
  setNewIntroduce,
  onIntroduceChange,
  onImageChange,
}) => {
  if (newIntroduce == null) newIntroduce = "";


  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const newImageFile = event.target.files[0];
      setNewProfileUrl(URL.createObjectURL(newImageFile));
      onImageChange(newImageFile);
    }
  };

  const handleIntroduceChange = (event) => {
    setNewIntroduce(event.target.value);
    onIntroduceChange(event.target.value);
  };

  return (
    <Modal open={open} onClose={handleCancle}>
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
        <IconButton
          aria-label="close"
          onClick={handleCancle}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
          프로필 편집
        </Typography>
        <Avatar
          src={newProfileUrl}
          alt="New Profile"
          sx={{ width: 150, height: 150, borderRadius: "50%", mb: 2 }}
        />
        <input
          accept="image/*"
          type="file"
          onChange={handleFileChange}
          style={{ display: "block", margin: "10px 0" }}
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
          onClick={handleApply}
          sx={{ mt: 2 }}
        >
          업데이트
        </Button>
      </Box>
    </Modal>
  );
};

export default ProfileSection;