import axios from 'axios'
import { toast } from "react-toastify";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:1176'
  });
  
  // Allow browser can get ===token=======
instance.defaults.withCredentials = true;

//   // Alter defaults after instance has been created
//   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;

  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const status = (error && error.response && error.response.status) || 500;
    switch (status) {
      case 400:   

        // Handle bad request errors
        console.error('Bad request:', error.response.data);
        break;
      case 401:
        // Handle unauthorized errors
        // Consider redirecting to login or displaying an error message
        toast.error('Unauthorized login')
        // window.location.href ='/login' arror based on local storage /home
        console.error('Unauthorized:', error.response.data);
        break;
      case 403:
        // Handle forbidden errors
        // Consider displaying an error message indicating lack of permission
        toast.error('Unauthorized login')
        console.error('Forbidden:', error.response.data);
        break;
      case 404:
        // Handle not found errors
        // Consider displaying a "Not Found" page
        console.error('Not found:', error.response.data);
        break;
      case 500:
        // Handle internal server errors
        // Consider displaying an error message indicating server issues
        console.error('Internal server error:', error.response.data);
        break;
      default:
        // Handle other error statuses
        console.error('Error:', error.response.data);
        break;
    }

    // Do something with response error
    return Promise.reject(error);
  });

  export default instance;