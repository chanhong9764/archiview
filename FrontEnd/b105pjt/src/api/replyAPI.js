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
  await baseURL
    .patch("replies", param, {
      headers: config,
    })
    .then(success)
    .catch(fail);
}

async function selectReply(config, id, success, fail) {
  await baseURL
    .get("replies/" + id, {
      headers: config,
    })
    .then(success)
    .catch(fail);
}

export { createReply, deleteReply, modifyReply, selectReply };
