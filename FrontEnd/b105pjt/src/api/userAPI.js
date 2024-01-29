import axios from "axios";

const signupAxios = async (payload) => {
  try {
    await axios.post("/api/users", { ...payload });
    // 회원가입 성공시 자동으로 로그인 되게 하는 로직 추가
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    alert(errorMessage);
    throw error;
  }
};

const sendEmailAxios = async (email) => {
  try {
    const { data } = await axios.post(`/api/users/auth/email?email=${email}`);
    return data;
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    alert(errorMessage);
    throw error;
  }
};

const loginAxios = async (payload) => {
  try {
    const { data } = await axios.post("/api/auth/login", payload);
    return data;
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    alert(errorMessage);
    throw error;
  }
};

const tokenVerifyAxios = async () => {
  try {
    await axios.post("/api/auth/rtVerify");
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    console.log(errorMessage);
    throw error;
  }
};

export { signupAxios, sendEmailAxios, loginAxios, tokenVerifyAxios };
