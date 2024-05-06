import axios from 'axios'
import { AxiosError, AxiosInstance } from 'axios'

import { retriveToken, login } from '@/modules/auth/services/auth.service'

interface ErrorHandlers {
    [key: number]: (error: AxiosError) => Promise<any>;
}

const errorHandler: ErrorHandlers = {
    401: checkUnauthorizedError
}

const client: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API,
    headers: {
        Accept: "application/json",
    }
})

client.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem("accessToken") as string;

    if (accessToken) config.headers!.Authorization = accessToken;

    return config;
}, (error) => {
    return Promise.reject(error);
});

client.interceptors.response.use(undefined, async (error: AxiosError) => {
    const resolvedError = await resolveErrorByStatus(error)

    if (resolvedError)
        return resolvedError

    return Promise.reject(error);
})

let failedQueue: Array<((token: any) => void)> = [];
let refreshRequest: Promise<any> | null = null

const processQueue = (error: any, token: string = '') => {
    failedQueue.forEach(prom => {
      if (error) {
        prom(error);
      } else {
        prom(token);
      }
    });
  
    failedQueue = [];
};
  

async function checkUnauthorizedError(error: AxiosError) { 
    if (error.config && error.response && error.response.status === 401 && !error.config?.url?.includes('/token')) {
        if (!refreshRequest) {
            refreshRequest = retriveToken({
                grant_type: 'refresh_token',
                client_id: import.meta.env.VITE_APP_CLIENT_ID,
                refresh_token: localStorage.getItem('refreshToken')!
            })
        }

        return new Promise((res, rej) => {
            failedQueue.push((token: any) => {
                error.config!.headers['Authorization'] = token;
                res(client.request(error.config!));
            });

            if (refreshRequest)
                refreshRequest
                    .then(() => {
                        processQueue(null, localStorage.getItem('accessToken')!)
                    })
                    .catch((err) => {
                        processQueue(err, '');

                        rej(err);
                        login()
                    })
                    .finally(() => {
                        refreshRequest = null
                    })

        })
    }
        
    return Promise.reject(error)
}

async function resolveErrorByStatus(error: AxiosError) {
    const status: number = error.response?.status as number;

    if (errorHandler[status])
        return await errorHandler[status](error)

    return null
}

export default client
