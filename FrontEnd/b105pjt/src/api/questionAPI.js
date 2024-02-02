import { baseAxios } from "../utils/httpCommons";

const baseURL = baseAxios();

async function replyQuestion(param, success, fail) {
  // await baseURL.get(`/questions/search?userId=${userId}&company=${name}&cs=${cs}&job=${job}&pgno=${pgno}`).then(success).catch(fail);
}

export { replyQuestion };
