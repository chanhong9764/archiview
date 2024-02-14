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

async function deleteReply(id, token, success, fail) {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  await baseURL
    .delete("replies/" + id, config)
    .then(success)
    .catch(fail);
}

async function modifyReply(param, token, success, fail) {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  await baseURL.patch("replies", param, config).then(success).catch(fail);
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
