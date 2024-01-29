import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import SearchTab from "../SCH_P_01/tabCompo";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { OpenVidu } from "openvidu-browser";
import {
  getToken,
  startRecording,
  stopRecording,
  closeSession,
  deleteRecording,
  fetchAll,
  fetchInfo,
  forceDisconnect,
  forceUnpublish,
  getRecording,
  listRecordings,
} from "../../api/openViduAPI";

let session;
let forceRecordingId;

const InsertForm = () => {
  const videoRef = useRef(null); // 비디오 요소 참조를 위한 ref

  useEffect(() => {
    const OV = new OpenVidu();
    session = OV.initSession();

    // 세션 이벤트와 스트림 구독
    session.on("streamCreated", (event) => {
      let subscriber = session.subscribe(event.stream, undefined);
      subscriber.addVideoElement(videoRef.current);
    });

    getToken(
      { sessionName: "yourSessionName" }, // API 요청을 위한 매개변수
      (resp) => {
        console.log("토큰 받기 성공:", resp.data[0]);

        let token = resp.data[0];
        session
          .connect(token, { clientData: "example" })
          .then(() => {
            const publisher = OV.initPublisher(videoRef.current, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: "640X480", // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video or not
            });

            session.publish(publisher);
          })
          .catch((error) => {
            console.log("세션 연결 실패:", error);
          });
      },
      (error) => {
        console.error("토큰 받기 실패:", error);
      }
    );

    // 컴포넌트 정리
    return () => {
      if (session) session.disconnect();
    };
  }, []);

  const handleRecordStart = () => {
    console.log("sessionId: ", session.sessionId);
    startRecording(
      {
        session: session.sessionId,
        outputMode: "COMPOSED",
        hasAudio: true,
        hasVideo: true,
      },
      (resp) => {
        console.log("녹화 시작: ", resp);
      },
      (error) => {
        console.log("에러 발생: ", error);
      }
    );
  };

  const handleRecordStop = () => {
    stopRecording(
      {
        recording: session.sessionId,
      },
      (resp) => {
        console.log("녹화 종료: ", resp);
      },
      (error) => {
        console.log("에러 발생: ", error);
      }
    );
  };

  return (
    <div>
      <TextField
        className="Insert-title"
        id="filled-basic"
        label="제목"
        variant="filled"
      />

      <div className="Insert-search">
        <SearchTab></SearchTab>
      </div>

      <div>
        <div ref={videoRef} autoPlay={true} />
        <Button
          variant="contained"
          endIcon={<CheckCircleIcon />}
          color="primary"
          onClick={handleRecordStart}
        >
          등록
        </Button>
        <Button
          variant="contained"
          endIcon={<CheckCircleIcon />}
          color="primary"
          onClick={handleRecordStop}
        >
          취소
        </Button>
      </div>

      <TextField
        className="Insert-script"
        id="filled-multiline-static"
        label="스크립트"
        multiline
        rows={4}
        defaultValue=""
        variant="filled"
      />
    </div>
  );
};

export default InsertForm;
