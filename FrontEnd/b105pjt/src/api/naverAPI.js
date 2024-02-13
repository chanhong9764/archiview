import { baseAxios } from "../utils/httpCommons";

const baseURL = baseAxios();

async function selectImg(param, success, fail) {
  await baseURL.get(`/commons/search?query=${param}`).then(success).catch(fail);
}

export { selectImg };
