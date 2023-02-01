import axios from "axios";

export const getToken = () => {
    if((Math.round(new Date().getTime()/1000) - localStorage.getItem('access-timestamp') > 86400) ) return 'token expired';

    const token = localStorage.getItem('x-access');

    if(!token) return false;

    return token;
};

export const getUserByToken = async () => {
    const token = getToken();

    if(token == 'token expired') return 'token expired';

    const data = await axios.post(`${process.env.REACT_APP_ROOT_API}/api/auth/login/identifyUser`, {
        token
    })
        .then(res => res.data)
        .catch(err => false);

    return data;
}