import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Loading = () => {
  const isLoading = useSelector((state) => state.isLoading);
  const [loadingText, setLoadingText] = useState("로딩중");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prevText) =>
        prevText.length < 6 ? prevText + "." : "로딩중"
      );
    }, 500);
    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 제거
  }, []);

  return (
    <div>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            zIndex: 2000,
          }}
        >
          <span>{loadingText}</span>
        </div>
      )}
    </div>
  );
};

export default Loading;
