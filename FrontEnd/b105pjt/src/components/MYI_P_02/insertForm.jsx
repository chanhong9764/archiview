import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
let publisher;

const MakeSession = (videoRef) => {
  const OV = new OpenVidu();
  session = OV.initSession();

  // 세션 이벤트와 스트림 구독
  session.on("streamCreated", (event) => {
    let subscriber = session.subscribe(event.stream, undefined);
    subscriber.addVideoElement(videoRef.current);
  });

  getToken(
    { sessionName: "yourSessionName" + Date.now() }, // API 요청을 위한 매개변수
    (resp) => {
      console.log("토큰 받기 성공:", resp.data[0]);

      let token = resp.data[0];
      session
        .connect(token, { clientData: "example" })
        .then(() => {
          publisher = OV.initPublisher(videoRef.current, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: "640X480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
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
};

const InsertForm = () => {
  const videoRef = useRef(null); // 비디오 요소 참조를 위한 ref
  const [recordingURL, setRecordingURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // 컴포넌트 정리
    MakeSession(videoRef);

    return () => {
      if (session) {
        // 현재 사용자의 연결 해제

        console.log("종료하는 세션ID", session.sessionId);
        console.log("종료하는 세션ID", session.connection.connectionId);
        forceDisconnect(
          {
            sessionName: session.sessionId,
            connectionId: session.connection.connectionId,
          },
          (resp) => {
            console.log("forceDisconect success: ", resp);
          },
          (err) => {
            console.log("forceDisconect err: ", err);
          }
        );

        // 세션 닫기
        closeSession(
          { sessionName: session.sessionId },
          (resp) => {
            console.log("closeSession success: ", resp);
          },
          (err) => {
            console.log("closeSession err: ", err);
          }
        );
      }
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
        setIsRecording(true);
      },
      (error) => {
        console.log("에러 발생: ", error);
      }
    );
  };

  const handleRecordStop = () => {
    let urlSession = session.sessionId;
    stopRecording(
      {
        recording: session.sessionId,
      },
      (resp) => {
        console.log("녹화 종료: ", resp);
        setRecordingURL(
          "https://i10b105.p.ssafy.io/openvidu/recordings/" + urlSession + "/" + urlSession + ".mp4"
        );
        console.log(recordingURL);
        setIsRecording(false);

        // 세션 및, 퍼블리셔 종료 로직
        if (publisher) {
          publisher.stream
            .getVideoElement()
            .parentNode.removeChild(publisher.stream.getVideoElement());
          session.unpublish(publisher);
        }
        session.disconnect();
      },
      (error) => {
        console.log("에러 발생: ", error);
      }
    );
  };

  const handleRestartRecording = () => {
    MakeSession(videoRef);
    setRecordingURL("");
  };

  return (
    <div>
      <TextField className="Insert-title" id="filled-basic" label="제목" variant="filled" />

      <div className="Insert-search">
        <SearchTab></SearchTab>
      </div>

      <div>
        {recordingURL && (
          <div>
            <div>
              <video controls src={recordingURL} width="640" height="480"></video>
            </div>
            <Button variant="contained" color="primary" onClick={handleRestartRecording}>
              다시 녹화하기
            </Button>
          </div>
        )}
        {!recordingURL && (
          <div>
            <div ref={videoRef} autoPlay={true} />
            <div>
              <Button
                variant="contained"
                endIcon={<CheckCircleIcon />}
                color="primary"
                onClick={handleRecordStart}
                disabled={isRecording} // 녹화 중에는 버튼 비활성화
              >
                녹화 시작
              </Button>
              <Button
                variant="contained"
                endIcon={<CheckCircleIcon />}
                color="primary"
                onClick={handleRecordStop}
                disabled={!isRecording} // 녹화 중이 아니면 버튼 비활성화
              >
                녹화 종료
              </Button>
            </div>
          </div>
        )}
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
