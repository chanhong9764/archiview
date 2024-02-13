import React from "react";
import { Paper } from "@mui/material";

const ProfileSection = ({ imageUrl, children }) => {
  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", margin: "20px 0", textAlign: "center" }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Profile"
          style={{
            maxWidth: "100%",
            height: "150px",
            borderRadius: "50%",
            width: "150px",
          }}
        />
      )}
      <div>{children}</div>
    </Paper>
  );
};

export default ProfileSection;
