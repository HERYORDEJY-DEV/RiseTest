import { store } from "~store";
import { RootState } from "~types/store";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

// For Make Log on Develop Mode
const logOnDev = (message: string) => {
  if (__DEV__) {
    console.log(message);
  }
};

class HttpBaseRequest {
  protected api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: `https://rise-rn-test-api-gb2v6.ondigitalocean.app/api/v1`,
      // baseURL: `${API_BASE_URL}/${API_VERSION_URL}`,
    });
    this.attachInterceptors();
  }
  private attachInterceptors() {
    this.api.interceptors.request.use(req => {
      try {
        const state: RootState = store.getState();
        const token = state.authentication.token;
        if (Boolean(token)) {
          req.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        // do nothing
      }
      return req;
    });

    this.api.interceptors.response.use(
      res => res,
      (error: AxiosError | Error): Promise<AxiosError> => {
        if (axios.isAxiosError(error)) {
          const { message } = error;
          const { method, url } = error.config as AxiosRequestConfig;
          const { statusText, status } =
            (error.response as AxiosResponse) ?? {};

          logOnDev(
            `---🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`,
          );

          switch (status) {
            case 401: {
              // "Login required"
              break;
            }
            case 403: {
              // "Permission denied"
              break;
            }
            case 404: {
              // "Invalid request"
              break;
            }
            case 500: {
              // "Server error"
              break;
            }
            default: {
              // "Unknown error occurred"
              break;
            }
          }

          if (status === 401) {
            // Delete Token & Go To Login Page if you required.
            // sessionStorage.removeItem("token");
          }
          return Promise.reject({ isError: true, status, message });
        } else {
          logOnDev(`+++🚨 [API] | Error ${error.message}`);
        }

        return Promise.reject(error);
      },
    );
  }

  autoBind(this: any) {
    const ignoreList = ["constructor", "bindMethods", "autoBind"];
    const list = Object.getOwnPropertyNames(this.prototype);
    list.forEach(method => {
      if (!ignoreList.includes(method)) {
        const localThis: any = this;
        localThis[method] = localThis[method].bind(this);
      }
    });
  }
}

export default HttpBaseRequest;
