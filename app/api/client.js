import { create } from "apisauce";
import cached from "../store";
const client = create({
  // baseURL: "http://172.20.10.3:1000/api/v1",
  baseURL: "https://api-aimedicare-yoshifa.herokuapp.com/api/v1",
});

const old = client.get;

client.get = async (url, params, axiosConfig) => {
  const response = await old(url, params, axiosConfig);
  if (response.ok) {
    cached.storeData(url, response.data);
    return response;
  }

  const data = await cached.getData(url);
  return data ? { ok: true, data } : response;
};

export default client;
