import { openViduAxios } from "../utils/httpCommons";

const openVidu = openViduAxios();

async function getToken(param, success, fail) {
  await openVidu
    .post("api/recording/get-token", param)
    .then(success)
    .catch(fail);
}

async function startRecording(param, success, fail) {
  await openVidu
    .post("api/recording/recording/start", param)
    .then(success)
    .catch(fail);
}

async function stopRecording(param, success, fail) {
  await openVidu
    .post("api/recording/recording/stop", param)
    .then(success)
    .catch(fail);
}

async function removeUser(param, success, fail) {
  await openVidu
    .post("api/recording/recording/remove-user", param)
    .then(success)
    .catch(fail);
}

async function closeSession(param, success, fail) {
  await openVidu
    .delete("api/recording/recording/close-session", param)
    .then(success)
    .catch(fail);
}

async function fetchInfo(param, success, fail) {
  await openVidu
    .post("api/recording/recording/fetch-info", param)
    .then(success)
    .catch(fail);
}

async function fetchAll(param, success, fail) {
  await openVidu
    .get("api/recording/recording/fetch-all", param)
    .then(success)
    .catch(fail);
}

async function forceDisconnect(param, success, fail) {
  await openVidu
    .delete("api/recording/recording/force-disconnect", param)
    .then(success)
    .catch(fail);
}

async function forceUnpublish(param, success, fail) {
  await openVidu
    .delete("api/recording/recording/force-unpublish", param)
    .then(success)
    .catch(fail);
}

async function deleteRecording(param, success, fail) {
  await openVidu
    .delete("api/recording/recording/delete", param)
    .then(success)
    .catch(fail);
}

async function getRecording(id, param, success, fail) {
  await openVidu
    .get("api/recording/recording/get/" + id, param)
    .then(success)
    .catch(fail);
}

async function listRecordings(param, success, fail) {
  await openVidu
    .get("api/recording/recording/list", param)
    .then(success)
    .catch(fail);
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
