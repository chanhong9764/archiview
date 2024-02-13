import { baseAxios } from "../utils/httpCommons";

const baseURL = baseAxios();

async function userDetail(param, success, fail) {
  await baseURL.get("users", param).then(success).catch(fail);
}

async function uploadProfileImage(id, formData, success, fail) {
  await baseURL
    .post("files/profile/" + id, formData)
    .then(success)
    .catch(fail);
}

async function updateUserDetail(config, param, success, fail) {
  await baseURL
    .patch("users", param, {
      headers: config,
    })
    .then(success)
    .catch(fail);
}

async function searchQuestion(config, param, success, fail) {
  await baseURL
    .get(
      "questions/search",
      { params: param },
      {
        headers: config,
      }
    )
    .then(success)
    .catch(fail);
}

export { userDetail, uploadProfileImage, updateUserDetail, searchQuestion };
