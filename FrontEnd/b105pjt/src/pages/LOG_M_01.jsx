import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import "../assets/css/LOG_M_01.css";

const LOG_M_01 = () => {
  return (
    <div className="LOG-M-01-Content">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="Logo">
            <img src="http://placehold.it/240X80" alt="" />
          </div>
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="ID-input"
            required
            id="filled-required"
            label="ID"
            defaultValue=""
            variant="filled"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="PW-input"
            required
            id="filled-required"
            label="PW"
            defaultValue=""
            variant="filled"
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            className="Login-btn"
            variant="contained"
            endIcon={<LoginIcon />}
            color="success"
          >
            로그인
          </Button>
        </Grid>

        <Grid className="Link-group" item xs={12}>
          <div style={{ marginRight: "20px" }}>아이디 찾기</div>
          <div
            style={{
              borderRight: "1px solid #000",
              borderLeft: "1px solid #000",
              padding: "0 20px",
            }}
          >
            비밀번호 찾기
          </div>
          <div style={{ marginLeft: "20px" }}>회원가입</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LOG_M_01;
