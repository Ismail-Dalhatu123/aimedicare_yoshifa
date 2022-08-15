import { useState } from "react";
import client from "../api/client";
import { RequestTypes, responseTypes } from "../api/request";
import secureStore from "../store/secureStore";

function useClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const Request = async (type, ...args) => {
    const response = { error: null, data: null };
    if (!Object.values(RequestTypes).includes(type)) {
      response.error = { message: { message: "Invalid Request Type" } };
      return response;
    }
    try {
      const tokens = await secureStore.getTokens();
      args[2] = {
        headers: {
          "x-access-token": tokens.accessToken,
          "x-refresh-token": tokens.refreshToken,
        },
      };
      setIsLoading(true);
      const res = await client[type](...args);
      if (res.data.type === responseTypes.error) {
        response.error = res.data;
        return response;
      }
      response.data = res.data;
      // if (res?.headers["x-access-token"] && res?.headers["x-refresh-token"]) {
      //   secureStore.setTokens({
      //     accessToken: res.headers["x-access-token"],
      //     refreshToken: res.headers["x-refresh-token"],
      //   });
      // }
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message);
      response["error"] = error?.response?.data;
    } finally {
      setIsLoading(false);
      setErrorMessage(response.error?.message);
    }
    return response;
  };

  const get = (...args) => {
    return Request(RequestTypes.GET, ...args);
  };
  const post = (...args) => {
    return Request(RequestTypes.POST, ...args);
  };
  const put = (...args) => {
    return Request(RequestTypes.PUT, ...args);
  };
  const fdelete = (...args) => {
    return Request(RequestTypes.DELETE, ...args);
  };
  const patch = (...args) => {
    return Request(RequestTypes.PATCH, ...args);
  };


  return {
    isLoading,
    get,
    post,
    put,
    fdelete,
    patch,
    Request,
    errorMessage,
  };
}

export default useClient;