import axios, { AxiosError } from "axios";
import { BASE_URL } from "./constants";

export const connectAPI = async (url: string, method: string, body?: any) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data: body,
    });
    return { status: response.status, data: response.data };
  } catch (error: any) {
    console.log(error.response.data);
    return {
      message: error.response.data.message,
    };
  }
};

export type Session = {
  type: "credentials" | "oauth";
  user: {
    email: string;
    username: string;
    id?: string;
    name?: string;
  };
  accessToken?: string;
};

export const getSession: () => Session = () => {
  // Read and deserialize the session object from the local storage
  const sessionString = localStorage.getItem("session");
  if (!sessionString) return null;
  return JSON.parse(sessionString);
};

export const setSession = (session: Session) => {
  // Serialize and write the session object to the local storage
  localStorage.setItem("session", JSON.stringify(session));
};

export const removeSession = () => {
  // Remove the session object from the local storage
  localStorage.removeItem("session");
};
