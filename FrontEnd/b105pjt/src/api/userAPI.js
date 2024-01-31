import { instance } from "../utils/httpCommons";

//회원가입 API
const signupAxios = async (payload) => {
  try {
    const { data } = await instance.post("/api/users", payload);
    return data;
    // 회원가입 성공시 자동으로 로그인 되게 하는 로직 추가
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    alert(errorMessage);
    throw error;
  }
};

//회원탈퇴 API
const signoutAxios = async (payload) => {
  try {
    const { data } = await instance.delete("/api/users", payload);
    return data;
    // 회원가입 성공시 자동으로 로그인 되게 하는 로직 추가
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    alert(errorMessage);
    throw error;
  }
};

// 아이디 찾기
const findidAxios = async (payload, email) => {
  try {
    const { data } = await instance.get(
      `/api/users/find-id?email=${email}`,
      payload
    );
    console.log(data);
    return data;
    // 회원가입 성공시 자동으로 로그인 되게 하는 로직 추가
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    alert(errorMessage);
    throw error;
  }
};

// 비밀번호 찾기
const findpwAxios = async (payload) => {
  try {
    const { data } = await instance.get(`/api/users/find-password`, payload);
    console.log(data);
    return data;
    // 회원가입 성공시 자동으로 로그인 되게 하는 로직 추가
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    alert(errorMessage);
    throw error;
  }
};

// 비밀번호 확인
const changepwAxios = async (payload) => {
  try {
    const { data } = await instance.patch(`/api/users/find-password`, {
      pw: payload,
    });
    console.log(data);
    return data;
    // 회원가입 성공시 자동으로 로그인 되게 하는 로직 추가
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    alert(errorMessage);
    throw error;
  }
};

//내 정보 변경 API
const editprofileAxios = async (payload) => {
  try {
    const { data } = await instance.patch("/api/users", payload);
    return data;
    // 회원가입 성공시 자동으로 로그인 되게 하는 로직 추가
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    alert(errorMessage);
    throw error;
  }
};

//회원가입 이메일 인증 API
const sendEmailAxios = async (email) => {
  try {
    const { data } = await instance.get(`/api/email?email=${email}`, {
      email: email,
    });
    console.log(data);
    return data;
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    alert(errorMessage);
    throw error;
  }
};

//아이디, 비밀번호 찾기 이메일 인증 API
const sendFindEmailAxios = async (email) => {
  try {
    const { data } = await instance.get(`/api/find-email?email=${email}`, {
      email: email,
    });
    console.log(data);
    return data;
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    alert(errorMessage);
    throw error;
  }
};

//로그인 API
const loginAxios = async (payload) => {
  try {
    const { data } = await instance.post("/api/users/login", payload);
    return data;
  } catch (error) {
    // const errorMessage = error.response.data.errorMessage;
    // alert(errorMessage);
    throw error;
  }
};

//로그아웃 API
const logoutAxios = async (payload) => {
  try {
    const { data } = await instance.get("/api/users/logout", payload);
    console.log(data);
    return data;
  } catch (error) {
    // const errorMessage = error.response.data.errorMessage;
    // alert(errorMessage);
    throw error;
  }
};

//토큰 확인 API
const tokenVerifyAxios = async () => {
  try {
    await instance.post("/api/auth/rtVerify");
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    console.log(errorMessage);
    throw error;
  }
};

export {
  signupAxios,
  sendEmailAxios,
  loginAxios,
  tokenVerifyAxios,
  logoutAxios,
  signoutAxios,
  findidAxios,
  sendFindEmailAxios,
  findpwAxios,
};
