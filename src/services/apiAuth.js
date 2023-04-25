import axios from "axios";

function signUp (body){
    const promise = axios.post(`${process.env.REACT_APP_BASE_URL}/sign-up`, body);
    return promise;
}
function login (body){
    const promise = axios.post(`${process.env.REACT_APP_BASE_URL}/sign-in`, body);
    return promise;
}
const authFunctions = {signUp, login};

export default authFunctions;