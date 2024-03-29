import axios from "axios";
import { BASE_URL } from "../__shared/constants";
export const connectAPI = async (
  url: string,
  method: string,
  body?: any,
  access_token?: string
) => {
  try {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    if (access_token) {
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      };
    }
    const request = {
      method,
      url: `${BASE_URL}${url}`,
      data: body,
      headers,
      timeout: 5000,
    };

    const response = await axios(request);
    return { status: response.status, data: response.data };
  } catch (error: any) {
    console.log(error);
    if (error.code === "ERR_NETWORK") {
      return {
        message: "Internal Server Error",
      };
    }
    return {
      message: error.response.data.message,
    };
  }
};
