import axios, { AxiosRequestConfig } from 'axios';

export default (axiosProps: AxiosRequestConfig) =>
  axios({
    ...axiosProps,
    timeout: 5000,
  });
