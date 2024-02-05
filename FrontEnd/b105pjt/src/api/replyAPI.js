import { baseAxios } from "../utils/httpCommons";

const baseURL = baseAxios();

async function createReply(config, param, success, fail) {
  await baseURL
    .post("replies", param, {
      headers: config,
    })
    .then(success)
    .catch(fail);
}

async function deleteReply(id, success, fail) {
  await baseURL
    .delete("replies/" + id)
    .then(success)
    .catch(fail);
}

async function modifyReply(config, param, success, fail) {
  await baseURL.patch("replies", config, param).then(success).catch(fail);
}

async function selectReply(id, success, fail) {
  await baseURL
    .get("replies/" + id)
    .then(success)
    .catch(fail);
}

export { createReply, deleteReply, modifyReply, selectReply };
