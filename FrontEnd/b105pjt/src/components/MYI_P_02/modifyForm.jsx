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
import { useDispatch } from "react-redux";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ConfirmModal from "./confirmModal";

let session;
let publisher;
let sessionName;

const MakeSession = async (videoRef) => {
  const OV = new OpenVidu();
  session = OV.initSession();

  // 세션 이벤트와 스트림 구독
  session.on("streamCreated", (event) => {
    let subscriber = session.subscribe(event.stream, undefined);
    subscriber.addVideoElement(videoRef.current);
  });

  sessionName = "yourSessionName" + Date.now();

  try {
    const resp = await getToken({ sessionName: sessionName });

    let token = resp.data[0];
    await session.connect(token, { clientData: "example" });

    publisher = OV.initPublisher(videoRef.current, {
      audioSource: undefined,
      videoSource: undefined,
      publishAudio: true,
      publishVideo: true,
      resolution: "1000X562",
      frameRate: 30,
      insertMode: "APPEND",
      mirror: false,
    });

    session.publish(publisher);
  } catch (error) {
    console.error("세션 설정 중 오류 발생:", error);
  }
};

const ModifyForm = (props) => {
  const videoRef = useRef(null); // 비디오 요소 참조를 위한 ref
  const [recordingURL, setRecordingURL] = useState(
    "https://i10b105.p.####.io/api/files/recording/" +
      props.reply.replies[0].videoUrl
  );
  const [isRecording, setIsRecording] = useState(false);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(props.reply.content);
  const [script, setScript] = useState(props.reply.replies[0].script);

  useEffect(() => {
    console.log("props>>", props.reply.content);
    // 컴포넌트 정리
    dispatch({ type: "SET_LOADING" });
    MakeSession(videoRef)
      .then(() => {
        dispatch({ type: "UNSET_LOADING" });
      })
      .catch((error) => {
        dispatch({ type: "UNSET_LOADING" });
      });

    return () => {
      if (session) {
        // 세션 및, 퍼블리셔 종료 로직
        if (publisher) {
          publisher = null;
        }
        // 세션 연결 해제
        session.disconnect();
      }
    };
  }, []);

  const handleRecordStart = () => {
    dispatch({ type: "SET_LOADING" });
    startRecording(
      {
        session: session.sessionId,
        outputMode: "COMPOSED",
        hasAudio: true,
        hasVideo: true,
      },
      (resp) => {
        setIsRecording(true);
        dispatch({ type: "UNSET_LOADING" });
      },
      (error) => {
        dispatch({ type: "UNSET_LOADING" });
      }
    );
  };

  const handleRecordStop = () => {
    dispatch({ type: "SET_LOADING" });
    let urlSession = session.sessionId;
    stopRecording(
      {
        recording: session.sessionId,
      },
      (resp) => {
        setRecordingURL(
          "https://i10b105.p.####.io/api/files/recording/" + urlSession
        );
        setIsRecording(false);

        // 세션 및, 퍼블리셔 종료 로직
        if (publisher) {
          publisher.stream
            .getVideoElement()
            .parentNode.removeChild(publisher.stream.getVideoElement());
          session.unpublish(publisher);
        }
        session.disconnect();
        dispatch({ type: "UNSET_LOADING" });
      },
      (error) => {
        dispatch({ type: "UNSET_LOADING" });
      }
    );
  };

  const handleRestartRecording = () => {
    dispatch({ type: "SET_LOADING" });
    MakeSession(videoRef);
    setRecordingURL("");
    dispatch({ type: "UNSET_LOADING" });
  };

  return (
    <div>
      <TextField
        className="Insert-title"
        id="filled-basic"
        label="제목"
        variant="filled"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // 제목 상태 업데이트
      />

      <div className="Insert-search">
        <SearchTab></SearchTab>
      </div>

      <div>
        {recordingURL && (
          <div>
            <div>
              <video controls src={recordingURL} width="1000"></video>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleRestartRecording}
                endIcon={<RefreshRoundedIcon />}
              >
                다시 녹화하기
              </Button>
            </div>
          </div>
        )}
        {!recordingURL && (
          <div>
            <div ref={videoRef} autoPlay={true} />
            <div>
              <Button
                variant="contained"
                endIcon={<VideoCameraFrontIcon />}
                color="primary"
                onClick={handleRecordStart}
                disabled={isRecording} // 녹화 중에는 버튼 비활성화
              >
                녹화 시작
              </Button>
              <Button
                variant="contained"
                endIcon={<VideocamOffIcon />}
                color="primary"
                onClick={handleRecordStop}
                disabled={!isRecording} // 녹화 중이 아니면 버튼 비활성화
                style={{ marginLeft: "5px" }}
              >
                녹화 종료
              </Button>
            </div>
          </div>
        )}
      </div>
      <br />

      <TextField
        className="Insert-script"
        id="filled-multiline-static"
        label="스크립트"
        multiline
        rows={4}
        variant="filled"
        value={script}
        onChange={(e) => setScript(e.target.value)} // 스크립트 상태 업데이트
        style={{ paddingTop: "5px" }}
      />
      <BtnGroupInsert />
    </div>
  );
};

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
      // 수정 로직을 여기에 추가하세요.
    } else if (confirmType === "delete") {
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

export default ModifyForm;
