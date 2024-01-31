import axios from "axios";

const VITE_NAVER_CLIENT_ID = "vDZwnjUq2L0ecmGLqTDE";
const VITE_NAVER_CLIENT_PW = "AFfmYdxuEK";
const VITE_NAVER_SEARCH_URL = "https://openapi.naver.com/v1/search/";

const instance = axios.create({
  baseURL: "https://i10b105.p.####.io:11443",
});

// Naver API용 axios 인스턴스 생성
function naverImgAxios() {
  const instance = axios.create({
    baseURL: VITE_NAVER_SEARCH_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-Naver-Client-Id": VITE_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": VITE_NAVER_CLIENT_PW,
    },
  });

  return instance;
}

const APPLICATION_SERVER_URL = "https://i10b105.p.####.io:8443/";

// openVidu API용 axios 인스턴스 생성
function openViduAxios() {
  const instance = axios.create({
    baseURL: APPLICATION_SERVER_URL,
    headers: {},
  });
  return instance;
}

export { naverImgAxios, openViduAxios, instance };
