import { baseAxios } from "../utils/httpCommons";

const question = baseAxios();

function questionSearch(param) {
  return question.get("questions/search", {
    params: param,
  });
}

export { questionSearch };
