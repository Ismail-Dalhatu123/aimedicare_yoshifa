import * as SecureStore from "expo-secure-store";

const accessKey = "AccessToken";
const refreshKey = "RefreshToken";
const dToken = "DToken";

const setToken = async (value, key) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log(error);
    console.log("Error Storing Item");
  }
};

const getToken = async (key) => {
  try {
    const token = await SecureStore.getItemAsync(key);
    return token;
  } catch (error) {
    return null;
  }
};

const removeToken = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {}
};

const setTokens = async (tokens) => {
  await setToken(tokens.accessToken, accessKey);
  await setToken(tokens.refreshToken, refreshKey);
};

const setDToken = async (token) => {
  await setToken(token, dToken);
};

const removeDToken = async () => {
  await removeToken(dToken);
};

const removeTokens = async () => {
  await removeToken(accessKey);
  await removeToken(refreshKey);
};

const getTokens = async () => {
  const accessToken = await getToken(accessKey);
  const refreshToken = await getToken(refreshKey);

  return { accessToken, refreshToken };
};

const getDToken = async () => {
  const token = await getToken(dToken);
  return token;
};
export default {
  setToken,
  getToken,
  removeToken,
  removeTokens,
  setTokens,
  getTokens,
  accessKey,
  refreshKey,
  setDToken,
  removeDToken,
  getDToken,
};