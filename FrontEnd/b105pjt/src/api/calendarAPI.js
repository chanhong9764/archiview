import { baseAxios } from "../utils/httpCommons";

let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let day = today.getDate(); // 날짜
let date = year + "-" + month + "-" + day;

const baseURL = baseAxios();

async function selectAllRecruits(param, success, fail) {
  await baseURL.get(`recruits?date=${date}`).then(success).catch(fail);
}

async function selectCompanyRecruits(param, success, fail) {
  await baseURL.get(`recruits?date=${date}`).then(success).catch(fail);
}

export { selectAllRecruits, selectCompanyRecruits };
