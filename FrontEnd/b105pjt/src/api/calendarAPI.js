import { baseAxios } from "../utils/httpCommons";

const baseURL = baseAxios();

async function selectAllRecruits(param, success, fail) {
  await baseURL.get(`recruits?date=${param}`).then(success).catch(fail);
}

async function selectCompanyRecruits(param, success, fail) {
  await baseURL.get(`recruits?date=${param}`).then(success).catch(fail);
}

async function detailCompanyRecruits(param, success, fail) {
  await baseURL.get(`recruits/${param}`).then(success).catch(fail);
}

export { selectAllRecruits, selectCompanyRecruits, detailCompanyRecruits };
