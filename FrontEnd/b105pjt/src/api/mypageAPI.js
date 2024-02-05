import { baseAxios } from "../utils/httpCommons";
import { openViduAxios } from "../utils/httpCommons";

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

export { userDetail, uploadProfileImage };
