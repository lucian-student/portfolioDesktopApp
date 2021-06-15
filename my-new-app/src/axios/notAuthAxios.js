import axios from 'axios';

/*
axios pro api s cookie 
*/
export default axios.create({
    withCredentials: true
});