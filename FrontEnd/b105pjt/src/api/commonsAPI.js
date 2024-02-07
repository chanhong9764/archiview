import { baseAxios } from "../utils/httpCommons";

const baseURL = baseAxios();

async function getCompanyList(success, fail) {
  await baseURL.get("commons/companies").then(success).catch(fail);
}

async function getJobPostingDetail(success, fail) {
  await baseURL.get("commons/tags").then(success).catch(fail);
}

async function getFilteredQuestionList(param, success, fail) {
  await baseURL
    .get(`commons/search?query=${param}`, param)
    .then(success)
    .catch(fail);
}

export { getCompanyList, getJobPostingDetail, getFilteredQuestionList };
