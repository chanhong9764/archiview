import { baseAxios } from "../utils/httpCommons";

const baseURL = baseAxios();

async function userDetail(param, success, fail) {
  await baseURL.get("/api/users", param).then(success).catch(fail);
}

export { userDetail };
