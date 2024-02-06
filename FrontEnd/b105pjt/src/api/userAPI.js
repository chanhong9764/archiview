import { baseAxios } from "../utils/httpCommons";

const baseURL = baseAxios();

// //회원가입 API
// const signupAxios = async (payload) => {
//   try {
//     const { data } = await instance.post("/users", payload);
//     return data;
//     // 회원가입 성공시 자동으로 로그인 되게 하는 로직 추가
//   } catch (error) {
//     const errorMessage = error.response.data.errorMessage;
//     alert(errorMessage);
//     throw error;
//   }
// };

// //회원탈퇴 API
// const signoutAxios = async (payload) => {
//   try {
//     const { data } = await instance.delete("/users", payload);
//     return data;
//     // 회원가입 성공시 자동으로 로그인 되게 하는 로직 추가
//   } catch (error) {
//     const errorMessage = error.response.data.errorMessage;
//     alert(errorMessage);
//     throw error;
//   }
// };

// // 아이디 찾기
// const findidAxios = async (payload, email) => {
//   try {
//     const { data } = await instance.get(
//       `/users/find-id?email=${email}`,
//       payload
//     );
//     console.log(data);
//     return data;
//     // 회원가입 성공시 자동으로 로그인 되게 하는 로직 추가
//   } catch (error) {
//     const errorMessage = error.response.data.errorMessage;
//     alert(errorMessage);
//     throw error;
//   }
// };

// // 비밀번호 찾기
// const findpwAxios = async (payload) => {
//   try {
//     const { data } = await instance.get(`/users/find-password`, payload);
//     console.log(data);
//     return data;
//     // 회원가입 성공시 자동으로 로그인 되게 하는 로직 추가
//   } catch (error) {
//     const errorMessage = error.response.data.errorMessage;
//     alert(errorMessage);
//     throw error;
//   }
// };

// // 비밀번호 확인
// const changepwAxios = async (payload) => {
//   try {
//     const { data } = await instance.patch(`/users/find-password`, {
//       pw: payload,
//     });
//     console.log(data);
//     return data;
//     // 회원가입 성공시 자동으로 로그인 되게 하는 로직 추가
//   } catch (error) {
//     const errorMessage = error.response.data.errorMessage;
//     alert(errorMessage);
//     throw error;
//   }
// };

// //내 정보 변경 API
// const editprofileAxios = async (payload) => {
//   try {
//     const { data } = await instance.patch("/users", payload);
//     return data;
//     // 회원가입 성공시 자동으로 로그인 되게 하는 로직 추가
//   } catch (error) {
//     const errorMessage = error.response.data.errorMessage;
//     alert(errorMessage);
//     throw error;
//   }
// };

// //회원가입 이메일 인증 API
// const sendEmailAxios = async (email) => {
//   try {
//     const { data } = await instance.get(`/api/email?email=${email}`, {
//       email: email,
//     });
//     console.log(data);
//     return data;
//   } catch (error) {
//     const errorMessage = error.response.data.errorMessage;
//     alert(errorMessage);
//     throw error;
//   }
// };

// //아이디, 비밀번호 찾기 이메일 인증 API
// const sendFindEmailAxios = async (email) => {
//   try {
//     const { data } = await instance.get(`/api/find-email?email=${email}`, {
//       email: email,
//     });
//     console.log(data);
//     return data;
//   } catch (error) {
//     const errorMessage = error.response.data.errorMessage;
//     alert(errorMessage);
//     throw error;
//   }
// };

// //로그인 API
// const loginAxios = async (payload) => {
//   try {
//     const { data } = await instance.post("/users/login", payload);
//     return data;
//   } catch (error) {
//     // const errorMessage = error.response.data.errorMessage;
//     // alert(errorMessage);
//     throw error;
//   }
// };

// //로그아웃 API
// const logoutAxios = async (payload) => {
//   try {
//     const { data } = await instance.get("/users/logout", payload);
//     console.log(data);
//     return data;
//   } catch (error) {
//     // const errorMessage = error.response.data.errorMessage;
//     // alert(errorMessage);
//     throw error;
//   }
// };

// //토큰 확인 API
// const tokenVerifyAxios = async () => {
//   try {
//     await instance.post("/api/auth/rtVerify");
//   } catch (error) {
//     const errorMessage = error.response.data.errorMessage;
//     console.log(errorMessage);
//     throw error;
//   }
// };

async function signup(param, success, fail) {
  await baseURL.post("users", param).then(success).catch(fail);
}

async function signout(param, success, fail) {
  await baseURL.delete("users", param).then(success).catch(fail);
}

async function findID(param, success, fail) {
  await baseURL
    .get(`users/find-id?name=${param.name}`, param)
    .then(success)
    .catch(fail);
}

async function findPW(param, success, fail) {
  await baseURL
    .get(`users/find-password?id=${param.id}&email=${param.email}`)
    .then(success)
    .catch(fail);
}

async function changePW(param, headers, success, fail) {
  const config = {
    headers: headers,
  };

  await baseURL
    .patch("users/update-password", param, config)
    .then(success)
    .catch(fail);
}

async function sendEmail(param, success, fail) {
  await baseURL
    .get(`users/join-email?email=${param.email}`, param)
    .then(success)
    .catch(fail);
}

async function sendFindEmail(param, success, fail) {
  await baseURL
    .get(`users/find-email?email=${param.email}`, param)
    .then(success)
    .catch(fail);
}

async function login(param, success, fail) {
  await baseURL.post("users/login", param).then(success).catch(fail);
}

async function logout(param, success, fail) {
  await baseURL.post("users/logout", param).then(success).catch(fail);
}

async function whoAmI(token, success, fail) {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  console.log(config);
  await baseURL.get("users", config).then(success).catch(fail);
}

export {
  // signupAxios,
  // sendEmailAxios,
  // loginAxios,
  // tokenVerifyAxios,
  // logoutAxios,
  // signoutAxios,
  // findidAxios,
  // sendFindEmailAxios,
  // findpwAxios,
  signup,
  sendEmail,
  login,
  logout,
  signout,
  findID,
  findPW,
  sendFindEmail,
  changePW,
  whoAmI,
};
