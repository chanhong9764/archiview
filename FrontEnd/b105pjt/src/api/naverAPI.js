import { naverImgAxios } from "../utils/httpCommons";

const naverImg = naverImgAxios();

async function selectImg(param, success, fail) {
  await naverImg.get("image", { params: param }).then(success).catch(fail);
}

export { selectImg };
