import axios from "axios";
export const instance = axios.create({
    baseURL: 'https://reqres.in/api',
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data ? response.data : {httpStatusCode: response.status};
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  export const conectBeClocks = axios.create({
    baseURL: 'http://localhost:8080/api/public/clock',
});
conectBeClocks.interceptors.response.use(function (response) {
  return response.data ? response.data : {httpStatusCode: response.status};
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});