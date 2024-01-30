import { openViduAxios } from "../utils/httpCommons";

const openVidu = openViduAxios();

function getToken(param) {
  return new Promise((resolve, reject) => {
    openVidu
      .post("api/recording/get-token", param)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
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
    .post("api/recording/remove-user", param)
    .then(success)
    .catch(fail);
}

async function closeSession(param, success, fail) {
  console.log("closeSession param: ", param);
  console.log("closeSession params: ", { params: param });
  await openVidu
    .delete("api/recording/close-session", { params: param })
    .then(success)
    .catch(fail);
}

async function fetchInfo(param, success, fail) {
  await openVidu
    .post("api/recording/fetch-info", param)
    .then(success)
    .catch(fail);
}

async function fetchAll(param, success, fail) {
  await openVidu
    .get("api/recording/fetch-all", param)
    .then(success)
    .catch(fail);
}

async function forceDisconnect(param, success, fail) {
  await openVidu
    .delete("api/recording/force-disconnect", param)
    .then(success)
    .catch(fail);
}

async function forceUnpublish(param, success, fail) {
  await openVidu
    .delete("api/recording/force-unpublish", param)
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
