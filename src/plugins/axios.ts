import axios, { AxiosError, AxiosInstance } from "axios";

let tries = 3;
interface ErrorHandlers {
  [key: number]: (error: AxiosError) => Promise<any>;
}

const errorHandler: ErrorHandlers = {
};

const client: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
  headers: {
    Accept: "application/json",
  },
});

client.interceptors.response.use(undefined, async (error: AxiosError) => {
  const resolvedError = await resolveErrorByStatus(error);

  if (resolvedError) return resolvedError;

  return Promise.reject(error);
});


async function resolveErrorByStatus(error: AxiosError) {
  const status: number = error.response?.status as number;

  if (errorHandler[status]) return await errorHandler[status](error);

  return null;
}

export default client;
