// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import { authKey } from "@/constant/authkey";
// import { getNewAccessToken } from "@/services/auth.services";
// import { setAccessToken } from "@/services/setAccessToken";
// import { getFromLocalStorage, setToLocalStorage } from "@/utils/local.storage";
// import axios from "axios";

// const instance = axios.create();
// instance.defaults.headers.post["Content-Type"] = "application/json";
// instance.defaults.headers["Accept"] = "application/json";
// instance.defaults.timeout = 60000;      
// // Add a request interceptor
// instance.interceptors.request.use(
//   function (config) {
//     const accessToken = getFromLocalStorage(authKey);
   
//     if (accessToken) {
//       config.headers.Authorization = accessToken;
//     }
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// // interceptors.response
// instance.interceptors.response.use(
//   (response) => {
//     // ✅ success case — wrap like RTK expects
//     response.data = {
//       data: response?.data,
//       meta: response?.data?.meta,
//     };
//     return response;
//   },
//   async (error) => {
//     const config = error.config;
//     if (error?.response?.status === 500 && !config.sent) {
//       config.sent = true;
//       const response = await getNewAccessToken();
//       const accessToken = response?.data?.accessToken;
//       config.headers["Authorization"] = accessToken;
//       setToLocalStorage(authKey, accessToken);
//       setAccessToken(accessToken);
//       return instance(config);
//     } else {
//       // ❌ Don’t just return the object — instead:
//       return Promise.reject(error); // 🔥 Properly throw the error so axiosBaseQuery can catch it
//     }
//   }
// );


// export { instance };
