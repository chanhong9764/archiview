import { baseAxios } from "../utils/httpCommons";

const baseURL = baseAxios();

function getToken(param) {
  return new Promise((resolve, reject) => {
    baseURL
      .post("recording/get-token", param)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

async function startRecording(param, success, fail) {
  await baseURL.post("recording/recording/start", param).then(success).catch(fail);
}

async function stopRecording(param, success, fail) {
  await baseURL.post("recording/recording/stop", param).then(success).catch(fail);
}

async function removeUser(param, success, fail) {
  await baseURL.post("recording/remove-user", param).then(success).catch(fail);
}

async function closeSession(param, success, fail) {
  await baseURL.delete("recording/close-session", { params: param }).then(success).catch(fail);
}

async function fetchInfo(param, success, fail) {
  await baseURL.post("recording/fetch-info", param).then(success).catch(fail);
}

async function fetchAll(param, success, fail) {
  await baseURL.get("recording/fetch-all", param).then(success).catch(fail);
}

async function forceDisconnect(param, success, fail) {
  await baseURL.delete("recording/force-disconnect", param).then(success).catch(fail);
}

async function forceUnpublish(param, success, fail) {
  await baseURL.delete("recording/force-unpublish", param).then(success).catch(fail);
}

async function deleteRecording(param, success, fail) {
  await baseURL.delete("recording/recording/delete", param).then(success).catch(fail);
}

async function getRecording(id, param, success, fail) {
  await baseURL
    .get("recording/recording/get/" + id, param)
    .then(success)
    .catch(fail);
}

async function listRecordings(param, success, fail) {
  await baseURL.get("recording/recording/list", param).then(success).catch(fail);
}

export {
  getToken,
  startRecording,
  stopRecording,
  closeSession,
  deleteRecording,
  fetchAll,
  fetchInfo,
  forceDisconnect,
  forceUnpublish,
  getRecording,
  listRecordings,
};
