import { baseAxios } from "../utils/httpCommons";

const baseURL = baseAxios();

async function getUserList(token, success, fail) {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  await baseURL.get(`admin/users`, config).then(success).catch(fail);
}

async function setUserBlock(param, token, success, fail) {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  await baseURL
<<<<<<< HEAD
    .patch(`admin/users/block?userId=${param}`, null, config)
=======
    .patch(`admin/users/block?userId=test&isBlocked=${true}`, config)
>>>>>>> b5021c95bd3841e60d2d3bd94d2edabf20e87e38
    .then(success)
    .catch(fail);
}

async function setUserUp(param, token, success, fail) {
  const config = {
    headers: {
      Authorization: token,
    },
  };

<<<<<<< HEAD
  console.log(">>>>>", param);

  await baseURL
    .patch(`admin/users/upgrade?userId=${param}`, null, config)
=======
  await baseURL
    .patch(`admin/users/upgrade?userId=${param}`, config)
>>>>>>> b5021c95bd3841e60d2d3bd94d2edabf20e87e38
    .then(success)
    .catch(fail);
}

async function setUserDown(param, token, success, fail) {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  await baseURL
<<<<<<< HEAD
    .patch(`admin/users/downgrade?userId=${param}`, null, config)
=======
    .patch(`admin/users/downgrade?userId=${param}`, config)
>>>>>>> b5021c95bd3841e60d2d3bd94d2edabf20e87e38
    .then(success)
    .catch(fail);
}

export { getUserList, setUserBlock, setUserDown, setUserUp };
