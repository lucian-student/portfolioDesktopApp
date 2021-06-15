import axios from 'axios';

/*
axios pro api s cookie 
*/
const jwtTransport = axios.create({
    withCredentials: true
});

/*
axios interceptor pro pridani acess tokenu do headeru 
a v pripade neplatnosti access tokenu ziskat novy acess token
*/
jwtTransport.interceptors.request.use(async function (config) {
    // add token
    config.headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return config;
}, function (error) {
    // Do something with request error
    console.log(error.message);
    return Promise.reject(error);
});

export default jwtTransport;