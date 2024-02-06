import { baseAxios } from "../utils/httpCommons";

const baseURL = baseAxios();

async function getUserList(token, success, fail) {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  await baseURL.get(`admin/users`, config).then(success).catch(fail);
}

export { getUserList };
