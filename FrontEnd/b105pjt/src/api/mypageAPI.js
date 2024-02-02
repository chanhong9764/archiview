import { baseAxios } from "../utils/httpCommons";

const baseURL = baseAxios();

async function userDetail(param, success, fail) {
  await baseURL.get("/api/users", param).then(success).catch(fail);
}

async function uploadProfileImage(id, formData, success, fail) {
  await baseURL
    .post("/api/files/profile/" + id, formData)
    .then(success)
    .catch(fail);
}

export { userDetail, uploadProfileImage };
